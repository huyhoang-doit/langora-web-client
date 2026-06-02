# Hướng dẫn Đồng bộ Giao diện và Phong cách Thiết kế (Theme & Styling Rules)

Tài liệu này định nghĩa các quy chuẩn thiết kế, hệ thống màu sắc (Theme) và cách sử dụng component của dự án **Langora Web Client** để đảm bảo tính đồng bộ khi phát triển trang mới.

---

## 1. Hệ thống Màu sắc (Theme Tokens)
Dự án sử dụng Tailwind CSS v4 kết hợp hệ màu `oklch`. Không được sử dụng mã màu HEX hoặc RGB cứng (`#ffffff`, `rgb(...)`) trong các phần tử giao diện. Thay vào đó, hãy sử dụng các CSS Variables ngữ nghĩa sau:

| Tên biến (CSS Variable) | Class Tailwind | Ý nghĩa / Cách dùng |
| :--- | :--- | :--- |
| `--background` | `bg-background` | Màu nền chính của ứng dụng |
| `--foreground` | `text-foreground` | Màu chữ chính |
| `--primary` | `bg-primary` / `text-primary` | Màu nhận diện thương hiệu (Tím/Indigo oklch) |
| `--primary-foreground` | `text-primary-foreground` | Màu chữ trên nền primary |
| `--secondary` | `bg-secondary` | Màu nền phụ |
| `--muted` | `bg-muted` | Màu nền cho các phần tử bị vô hiệu hóa hoặc làm mờ |
| `--muted-foreground` | `text-muted-foreground` | Màu chữ chú thích, chữ mờ |
| `--border` | `border-border` | Màu đường viền tiêu chuẩn |
| `--ring` | `ring-ring` | Màu vòng focus |

*Chú ý:* Luôn kiểm tra giao diện ở cả hai chế độ **Light Mode** và **Dark Mode** khi phát triển.

---

## 2. Bo góc (Border Radius) & Font chữ
- **Border Radius**: Sử dụng `--radius: 0.375rem`. Khi viết code, dùng các class Tailwind tiêu chuẩn như `rounded-lg` (tương ứng `--radius`), `rounded-md`, hoặc `rounded-sm`. Không sử dụng bo góc tùy ý khác ngoài hệ thống.
- **Typography (Font)**:
  - Font Sans mặc định: `Inter, sans-serif` (sử dụng class `font-sans`).
  - Tránh tự ý định nghĩa kích thước font chữ hoặc letter-spacing bằng số cứng. Sử dụng các class như `tracking-tight`, `tracking-wide`, `tracking-widest`.

---

## 3. Các Utility Class Đặc trưng của Dự án
Dự án định nghĩa sẵn một số class hữu ích trong `@layer utilities` của [globals.css](file:///Volumes/KingSton%201TB/Web/Langora/langora-web-client/app/globals.css), hãy tái sử dụng thay vì viết lại:
1. **Glassmorphism**:
   - `.glass`: Nền mờ kính nhẹ (`@apply bg-card/60 backdrop-blur-md border border-border/40`).
   - `.glass-strong`: Nền mờ kính đậm (`@apply bg-card/80 backdrop-blur-xl border border-border/60`).
2. **AI Glow (Hiệu ứng phát sáng AI)**:
   - `.ai-glow`: Dải chuyển màu phát sáng dọc theo tông màu primary.
   - `.ai-radial-glow`: Phát sáng tỏa tròn từ tâm.
3. **Scrollbar mỏng**:
   - `.scrollbar-thin`: Thanh cuộn mỏng tinh tế, tự động chuyển màu theo theme.
4. **3D Card Flip**:
   - `.perspective-1000`, `.card-inner`, `.card-flipped`, `.card-face`, `.card-back`: Bộ class dùng để dựng hiệu ứng lật thẻ flashcard 3D.

---

## 4. Sử dụng Component Hệ thống
Tuyệt đối không tự viết các thẻ HTML thô (`<button>`, `<input>`, `<select>`) mà không có style. Hãy import và sử dụng các component Shadcn UI có sẵn tại thư mục [components/ui](file:///Volumes/KingSton%201TB/Web/Langora/langora-web-client/components/ui):

- **Bố cục & Khung**: Sử dụng `Card`, `CardHeader`, `CardTitle`, `CardContent`.
- **Nút bấm**: Sử dụng `Button` (hỗ trợ các variant `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`).
- **Form đầu vào**: Sử dụng `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Select`, `Switch`.
- **Trạng thái & Tiến trình**:
  - `Badge`: Dùng để hiển thị tag, nhãn trạng thái.
  - `Progress`: Dùng hiển thị thanh tiến độ (XP, độ thành thạo từ vựng...). Component này hỗ trợ cả prop `indicatorClassName` để thay đổi màu sắc thanh chạy.
  - `Avatar`: Dùng hiển thị ảnh đại diện user.
- **Tương tác**: `Dialog`, `Drawer`, `DropdownMenu`, `Tooltip`, `Sheet`, `Tabs`.

---

## 5. Quy tắc Thiết kế Responsive
- Tất cả các trang phải hỗ trợ tốt trên Mobile, Tablet, và Desktop.
- Sử dụng grid layout linh hoạt: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Ẩn/hiện phần tử hợp lý bằng cách sử dụng các prefix kích thước màn hình của Tailwind (ví dụ: `hidden md:flex`, `block lg:hidden`).
- Tái sử dụng thanh Sidebar điều hướng chính [app-sidebar.tsx](file:///Volumes/KingSton%201TB/Web/Langora/langora-web-client/components/app-sidebar.tsx) cho bố cục ứng dụng trong trang dashboard.
