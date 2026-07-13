# Hướng Dẫn Sử Dụng & Rules Cho Axios Instance

Tài liệu này quy định các quy tắc (rules) và cung cấp hướng dẫn sử dụng (guidelines) khi gọi API trong dự án Langora Admin Portal bằng `axiosInstance` đã được cấu hình sẵn.

---

## 1. Quy Tắc Bắt Buộc (Mandatory Rules)

1. **Tuyệt đối không dùng `fetch` API hay `axios` mặc định** để gọi các API nội bộ của hệ thống (những API yêu cầu xác thực). LUÔN LUÔN import và sử dụng `axiosInstance` từ `configs/axios.ts`.
2. **Không tự tay truyền Token vào Header**: `axiosInstance` đã tự động xử lý lấy token từ `localStorage` và đính kèm vào header `Authorization: Bearer <token>`.
3. **Không tự tay xử lý Refresh Token**: Logic làm mới token khi lỗi 401 Unauthorized đã được xử lý ngầm trong Response Interceptor. Nếu token chết hẳn, hệ thống sẽ tự redirect về trang đăng nhập.
4. **Luôn bọc API Call trong `try...catch`**: Lỗi từ server (hoặc lỗi mạng) đã được chuẩn hóa trong interceptor (trả về Promise.reject), nên phía Component/Service phải dùng catch để bắt và hiển thị thông báo lỗi (Toast/Snackbar) cho người dùng.

---

## 2. Cách Import và Khởi Tạo Service

Khuyến khích tạo các thư mục `services` (hoặc `apis`) tương ứng với từng module để quản lý endpoint, thay vì gọi trực tiếp axios trong giao diện Component.

**Ví dụ cấu trúc:**
```typescript
// app/users/services/user.service.ts
import axiosInstance from '@/configs/axios';

// Định nghĩa Types/Interfaces cho request/response
export interface User {
  id: string;
  email: string;
  status: string;
}

export const UserService = {
  // Lấy danh sách user
  getUsers: async (page = 1, limit = 10) => {
    // Không cần bóc tách `res.data` vì Interceptor đã tự động return `response.data`
    const data = await axiosInstance.get('/admin/users', {
      params: { page, limit }
    });
    return data;
  },

  // Tạo mới user
  createUser: async (payload: any) => {
    const data = await axiosInstance.post('/admin/users', payload);
    return data;
  },

  // Xóa user
  deleteUser: async (id: string) => {
    const data = await axiosInstance.delete(`/admin/users/${id}`);
    return data;
  }
};
```

---

## 3. Hướng Dẫn Gọi API Trong Component

Sử dụng React Hooks (`useState`, `useEffect`) hoặc các thư viện quản lý state (như SWR, React Query, Zustand) kết hợp với hàm service ở trên.

### Gọi trực tiếp với `useEffect`
```tsx
'use client';
import { useEffect, useState } from 'react';
import { UserService } from '../services/user.service';
import toast from 'react-hot-toast'; // Hoặc thư viện Toast bạn đang dùng

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // data chính là response.data từ axios
        const data = await UserService.getUsers(); 
        // Giả sử API trả về form: { status: 'success', data: [...] }
        setUsers(data.data);
      } catch (error: any) {
        // error lúc này đã được unwrapped từ interceptor
        toast.error(error.message || 'Lỗi khi tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return <div>{/* Render giao diện */}</div>;
}
```

---

## 4. Lưu ý khi dùng trong Next.js App Router

- **Client Components (`'use client'`):** Hoạt động hoàn hảo với `axiosInstance` do có quyền truy cập vào `localStorage` (để lấy token tự động).
- **Server Components:** `localStorage` KHÔNG TỒN TẠI trên server. Nếu bạn cần fetch data bằng Axios trên Server Component, bạn sẽ phải trích xuất token từ `cookies()` của `next/headers` và truyền thủ công vào request. 
  👉 **Khuyến nghị:** Đối với Admin Portal (đòi hỏi tương tác và tính bảo mật cao, không quá khắt khe SEO), ưu tiên fetch dữ liệu ở Client Component bằng SWR/React Query kết hợp với `axiosInstance`.

---

## 5. Tùy Chỉnh Đặc Biệt (Bypass Interceptors)

Trong trường hợp bạn cần gọi API bên thứ ba (Ví dụ: fetch ảnh từ Cloudinary, gọi API thời tiết) không cần Authorization header của Langora:
**Tuyệt đối KHÔNG dùng `axiosInstance`**. Hãy dùng `fetch` chuẩn hoặc import lại `axios` nguyên bản.

```typescript
import axios from 'axios';

// API bên thứ 3 không liên quan đến hệ thống admin
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Dùng axios thuần
  const res = await axios.post('https://api.cloudinary.com/...', formData);
  return res.data;
}
```
