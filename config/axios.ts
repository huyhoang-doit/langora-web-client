import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// ==============================================================================
// 1. Types & Interfaces
// ==============================================================================

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ==============================================================================
// 2. Constants & Helpers
// ==============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/langora/api/v1';
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Token helpers (Có thể điều chỉnh tuỳ theo cách bạn lưu token: localStorage, cookie, hay Zustand/Redux)
const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    if (accessToken) localStorage.setItem('access_token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
  }
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// ==============================================================================
// 3. Axios Instance
// ==============================================================================

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==============================================================================
// 4. Request Interceptor
// ==============================================================================

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Thêm Access Token vào Header nếu có, ngoại trừ /auth/login và /auth/register
    const token = getAccessToken();
    const isAuthEndpoint = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');

    if (token && config.headers && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ==============================================================================
// 5. Response Interceptor
// ==============================================================================

// Cờ để chống gọi refresh token nhiều lần đồng thời
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về trực tiếp data bên trong response để tiện cho việc gọi API
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Xử lý lỗi 401 Unauthorized (Hết hạn Token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Đang refresh thì đưa request này vào hàng đợi
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // Không có refresh token -> Force logout
        console.warn(`[Axios] 401 Unauthorized for URL: ${error.config?.url}. No refresh token, forcing logout.`);
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        // Gọi API refresh token
        // Lưu ý: Sử dụng axios thuần để không chạy qua interceptor hiện tại
        const rs = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = rs.data.data;

        // Lưu lại token mới
        setTokens(newAccessToken, newRefreshToken);

        // Cập nhật lại Authorization header cho request cũ
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Chạy lại các request đang đợi
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token cũng hết hạn hoặc lỗi -> Force logout
        console.warn(`[Axios] 401 Unauthorized for Refresh Token API. Forcing logout.`);
        processQueue(refreshError as AxiosError, null);
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Xử lý một số mã lỗi phổ biến khác
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error('[Axios] Forbidden - Bạn không có quyền truy cập.');
          break;
        case 404:
          console.error('[Axios] Not Found - Tài nguyên không tồn tại.');
          break;
        case 500:
          console.error('[Axios] Internal Server Error - Lỗi hệ thống.');
          break;
        default:
          break;
      }
    }

    // Luôn trả về Promise.reject để Component hoặc Service phía trên bắt lỗi
    return Promise.reject(
      (error.response && error.response.data) || error.message || 'Có lỗi xảy ra, vui lòng thử lại sau.'
    );
  }
);

export default axiosInstance;
