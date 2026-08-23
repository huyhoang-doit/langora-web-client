/**
 * ora-markdown.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Thành phần: Bộ render markdown nhẹ (lite) cho bong bóng chat của Ora AI.
 *
 * Hỗ trợ các cú pháp Spring AI thường trả về:
 *   - **in đậm** → <strong>
 *   - *in nghiêng* → <em>
 *   - `code` → <code>
 *   - * danh sách → dấu chấm đầu dòng (bullet)
 *   - \n → xuống hàng / khoảng trống giữa đoạn
 *
 * Không bao giờ dùng dangerouslySetInnerHTML cho tin nhắn người dùng —
 * chỉ dùng cho bong bóng AI (nơi chúng ta kiểm soát nguồn dữ liệu).
 */

/** Áp dụng định dạng inline: **bold**, *italic*, `code` */
function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-muted px-1 py-0.5 rounded text-[0.8em] font-mono">$1</code>'
    );
}

/**
 * Chuyển đổi nội dung markdown từ AI thành JSX an toàn.
 * Xử lý từng dòng một để danh sách bullet trở thành phần tử block riêng biệt.
 */
export function OraMarkdown({ content }: { content: string }) {
  const html = content
    .split("\n")
    .map((line) => {
      // Dòng danh sách: "* nội dung" hoặc "• nội dung"
      const bulletMatch = line.match(/^[*•]\s+(.+)/);
      if (bulletMatch) {
        const inner = applyInline(bulletMatch[1]);
        return `<span class="flex gap-1.5 items-start"><span class="mt-[3px] shrink-0 text-primary">•</span><span>${inner}</span></span>`;
      }
      // Dòng thường — áp dụng định dạng inline
      const inlined = applyInline(line);
      return inlined
        ? `<span class="block">${inlined}</span>`
        : `<span class="block h-2"></span>`;
    })
    .join("");

  return (
    <span
      className="flex flex-col gap-0.5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
