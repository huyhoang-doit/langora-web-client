# Hướng dẫn Đồng bộ Giao diện và Phong cách Thiết kế (Theme & Styling Rules)

Tài liệu này định nghĩa các quy chuẩn thiết kế, hệ thống typography, màu sắc, viền, shadow và cách sử dụng component của dự án **Langora Web Client** nhằm đảm bảo tính đồng bộ khi phát triển tính năng mới.

Định hướng thiết kế của Langora là sự kết hợp hài hòa giữa **Premium & Gamified** (học tập nhưng vẫn mang lại cảm giác công nghệ cao, hiện đại và lôi cuốn):
> **Duolingo + Linear + Headspace + Notion**

---

## 1. Hệ thống Typography (Tối ưu Tiếng Việt)

Để tránh cảm giác quá khô cứng của các SaaS template thông thường và tối ưu hóa hiển thị dấu Tiếng Việt, dự án sử dụng hệ thống gồm **3 nhóm font chữ** chính:

| Vai trò | Font chữ | Cách sử dụng | Mục tiêu |
| :--- | :--- | :--- | :--- |
| **Heading** (Tiêu đề chính) | `Be Vietnam Pro` | Class mặc định cho `h1` đến `h6` hoặc `.text-heading` | Font hình học (geometric) hiện đại, nét dày đậm (weight 700–900), **đã tối ưu hóa 100% cho dấu Tiếng Việt** giúp không bị đè hay méo ký tự. |
| **Body / UI Text** | `Inter` | Class mặc định `font-sans` hoặc thẻ thường | Đảm bảo tính rõ ràng, dễ đọc khi hiển thị nhãn nút bấm, bảng biểu và văn bản dài. |
| **Learning Content** | `Nunito` | Class `.text-learning` | Font bo tròn thân thiện tạo cảm giác mềm mại, dễ tiếp thu cho các câu hỏi, từ vựng và nội dung flashcards. |

### Nguyên tắc trình bày tiêu đề:
- Ưu tiên viết hoa chữ cái đầu và sử dụng emoji sinh động ở đầu tiêu đề (ví dụ: `🔥 Continue Your Journey`, `📚 Vocabulary Mastery`, `🎯 Today's Mission`).
- Font weight tiêu đề nên đặt cao (`font-bold` hoặc `font-black` - tương đương weight 700, 800, 900).

---

## 2. Đường viền (Border System) & Bo góc (Radius)

Tránh các viền 1px mỏng của SaaS dashboard truyền thống. Giao diện Langora sử dụng hệ thống viền rõ nét để tạo cảm giác tactile (chân thực, tương tác tốt):
- **Độ dày viền (Border Width)**: Các khối tương tác chính (Cards, Buttons, Inputs) sử dụng viền dày **`2px`** (`border-2 border-border`).
- **Bo góc (Border Radius)**:
  - Khối nội dung lớn/Cards học tập: Bo góc **`20px`** (sử dụng class `--radius: 20px` tương ứng `rounded-2xl` hoặc các biến thể `rounded-xl` / `rounded-3xl` tùy chỉnh).
  - Nút bấm chính (`.btn-edu`): Thiết kế dạng **`rounded-full`** (viên thuốc) để tạo sự thân thiện, dễ bấm.

---

## 3. Hệ thống Bóng đổ (Shadow System)

Dự án áp dụng phong cách **Neo-brutalist nhẹ** (bóng đổ phẳng, có offset rõ ràng và không mờ mịn kiểu truyền thống) để tăng chiều sâu mà không làm giao diện bị rối:
- **Shadow chuẩn**: `--shadow: 0 6px 0px 0px rgba(99, 102, 241, 0.25)`.
- **Shadow khi Hover**: `--shadow-md: 0 8px 0px 0px rgba(99, 102, 241, 0.25)`.
- **Quy tắc Hover**: Khi người dùng trỏ chuột vào card tương tác, card sẽ dịch chuyển lên trên (`translate-y-[-4px]`) đồng thời shadow tăng kích thước để tạo hiệu ứng nổi lên sinh động.

---

## 4. Hệ thống Màu sắc & Gradient học tập

Bên cạnh màu sắc nhận diện thương hiệu chủ đạo (Tím Indigo), Langora bổ sung các dải màu chuyển tiếp (Gradients) để khơi gợi cảm hứng học tập:
- **Dải Gradient tiêu chuẩn**: `from-indigo-500 via-blue-500 to-cyan-400`.
- **Ứng dụng**: Dùng cho thanh tiến trình (Progress), chỉ số kinh nghiệm (XP), chuỗi ngày học liên tục (Streak) và các khu vực Hero nổi bật.

---

## 5. Các Utility Class Đặc trưng

Hãy tái sử dụng các utility class sau được định nghĩa sẵn trong `globals.css`:

```css
/* 1. Hộp học tập (Card) tiêu chuẩn */
.card-edu {
  border: 2px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--card);
}

/* 2. Hộp học tập có khả năng tương tác (di chuột có hiệu ứng nổi) */
.card-edu-interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: color-mix(in oklch, var(--primary) 60%, var(--border));
}

/* 3. Nút bấm phong cách giáo dục gamified (viền dày, hiệu ứng nhấn 3D) */
.btn-edu {
  border: 2px solid currentColor;
  border-radius: 9999px;
  font-weight: 700;
  height: 48px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-edu:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 0 currentColor;
}
.btn-edu:active {
  transform: translateY(0);
  box-shadow: 0 0px 0 currentColor;
}

/* 4. Glassmorphism */
.glass {
  @apply bg-card/60 backdrop-blur-md border-2 border-border/40;
}

/* 5. Hiệu ứng lật Flashcard 3D */
.perspective-1000   /* Container bên ngoài */
.card-inner          /* Khung thẻ bên trong (chứa transform) */
.card-flipped        /* Class thêm vào khi thẻ lật mặt sau */
.card-face           /* Mặt thẻ (backface-visibility: hidden) */
.card-back           /* Mặt sau (rotateY(180deg)) */
```

---

## 6. Lồng ghép Mascot Rồng "Ora" (🐲)

Rồng con **Ora** là linh vật và là người bạn đồng hành AI xuyên suốt nền tảng. Khi thiết kế trang hoặc component, hãy lồng ghép Ora để cá nhân hóa giao diện:
- **Trạng thái Trống (Empty State)**: Thay vì ghi "No data available", hãy hiển thị Ora cùng lời thoại, ví dụ: *"Ora đang chuẩn bị bài học mới cho bạn..."*
- **Trạng thái Tải (Loading)**: *"Ora đang suy nghĩ..."* hoặc *"Ora đang tìm kiếm từ vựng..."*
- **Trạng thái Thành công (Success)**: *"Ora tự hào vì bạn đã duy trì chuỗi học 7 ngày qua! 🔥"*

---

## 7. Quy chuẩn Layout & Responsive

- **Tư duy bố cục**: Thiết kế theo phong cách nhiệm vụ hàng ngày (Today's Mission), mục tiêu học tập (Learning Path), thay vì bố cục cột dữ liệu admin truyền thống.
- **Trải nghiệm Mobile-first**: Học tập diễn ra nhiều trên điện thoại. Hãy đảm bảo tất cả các component, đặc biệt là Flashcards và Quiz, được căn chỉnh hoàn hảo trên các màn hình nhỏ. Sử dụng `grid grid-cols-1 md:grid-cols-2` và ẩn các thông tin phụ bằng `hidden lg:block`.
- **Sidebar điều hướng**: Sử dụng [app-sidebar.tsx](file:///Volumes/KingSton%201TB/Web/Langora/langora-web-client/components/app-sidebar.tsx) có sẵn với các hiệu ứng kính mờ (glassmorphism) và bo góc mềm mại.

---

## 8. Quy chuẩn Sidebar & Điều hướng (Sidebar & Navigation Rules)

Để đồng bộ phong cách điều hướng cao cấp:
- **Logo của ứng dụng**: Luôn sử dụng icon rồng Ora `🐲` bọc trong khung viền 2px (`border-2 bg-primary/10 border-primary/20 rounded-xl`). Chữ tiêu đề "Langora" dùng font `Be Vietnam Pro` (`text-heading` / `font-black`).
- **Nút điều hướng đang hoạt động (Active Item)**:
  - Phải có viền `border-2 border-primary/20` và nền `bg-primary/5`.
  - Có bóng đổ phẳng tactile nhẹ dưới chân: `shadow-[0_4px_0_0_rgba(99,102,241,0.1)]`.
  - Có hiệu ứng nhấc nhẹ lên: `translate-y-[-2px]`.
- **Nút điều hướng thông thường (Inactive Item)**:
  - Có viền ẩn `border-2 border-transparent` để tránh hiện tượng nhấp nháy hoặc dịch chuyển bố cục khi chuyển trạng thái active.
  - Hover chuyển màu nền mờ nhạt: `hover:bg-muted/40 hover:text-foreground`.
- **Điều hướng Mobile (Mobile Bottom Nav)**:
  - Sử dụng class `.glass` làm nền kính mờ mượt mà và viền trên dày 2px (`border-t-2 border-border/80`).
  - Active item trên mobile có bóng đổ nhẹ và nền nổi bật `bg-primary/10 border border-primary/20`.
