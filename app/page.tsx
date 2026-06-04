import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sparkles,
  BookOpen,
  Layers,
  PenLine,
  BarChart2,
  Flame,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans">
      {/* Radial background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-30" />
      </div>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          <Link href="/" className="hover:opacity-80 transition-opacity mr-8">
            <img src="/big-logo.png" className="h-12 w-auto scale-150 origin-left select-none" alt="Langora Logo" />
          </Link>
          <div className="hidden md:flex gap-10 items-center">
            {["Features", "How it works", "Testimonials", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-muted-foreground font-medium hover:text-primary transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button className="font-bold text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 bg-muted/50 border border-border px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Next-Gen Language OS
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              Master Languages{" "}
              <span className="text-primary">Smarter with AI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Build vocabulary, improve writing, and learn faster with personalized AI. Hệ thống học tập
              thông minh dựa trên khoa học nhận thức.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 rounded-xl font-bold text-base hover:shadow-[0_0_24px_rgba(168,240,106,0.35)]">
                  Bắt đầu học miễn phí
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl font-medium text-base" asChild>
                <a href="#demo-section">Xem bản demo</a>
              </Button>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative min-h-[450px] flex items-center justify-center">
            <div className="w-full h-[380px] bg-card rounded-2xl border border-border shadow-2xl relative overflow-hidden">
              <div className="p-4 border-b border-border flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 w-28 bg-muted rounded-lg" />
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-muted rounded-full" />
                    <div className="h-8 w-8 bg-muted rounded-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-muted rounded-full" />
                  <div className="h-4 w-1/2 bg-muted rounded-full" />
                  <div className="h-4 w-5/6 bg-muted rounded-full" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[65, 85, 40].map((w, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3">
                      <div className="h-3 w-full bg-background rounded-full overflow-hidden mb-1 border border-border">
                        <div className="h-full bg-primary" style={{ width: `${w}%` }} />
                      </div>
                      <div className="h-2 w-8 bg-background rounded-full border border-border" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-3 left-0 glass rounded-xl p-4 w-44 shadow-xl animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">FLASHCARD</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">木漏れ日</h3>
              <p className="text-xs text-muted-foreground">Japanese • N2</p>
            </div>

            <div className="absolute -bottom-6 right-0 md:right-6 glass p-5 rounded-xl w-60 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <PenLine className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">AI Coach</span>
              </div>
              <div className="text-sm leading-relaxed text-foreground">
                "I{" "}
                <span className="bg-destructive/20 text-destructive px-1 rounded">gived</span>{" "}
                <span className="text-primary">gave</span> her the book."
              </div>
              <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground italic">
                "Use past tense for completed actions."
              </div>
            </div>

            <div className="absolute top-16 -right-2 glass px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg">
              <Flame className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Daily Streak</div>
                <div className="text-sm font-bold text-foreground">15 ngày</div>
              </div>
            </div>

            <div className="absolute bottom-10 -left-6 glass p-4 rounded-xl w-52 shadow-lg">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-foreground">XP Progress</span>
                <span className="text-xs text-muted-foreground">850/1000</span>
              </div>
              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                <div className="h-full bg-primary shadow-[0_0_8px_rgba(168,240,106,0.4)]" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section id="features" className="bg-card/50 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { num: "10.000+", label: "Học viên tích cực" },
            { num: "500.000+", label: "Từ vựng đã học" },
            { num: "98%", label: "Hài lòng với AI" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-5xl font-black text-primary mb-2">{num}</div>
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo-section" className="py-12 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
            Khám phá sức mạnh của <span className="text-primary">Langora</span>
          </h2>
        </div>

        {/* Video Player in Premium Device Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ambient Glow behind the video */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-indigo-500/20 opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000 -z-10" />

          <div className="w-full bg-card rounded-2xl border border-border shadow-2xl overflow-hidden relative group">
            {/* Browser Header Mockup */}
            <div className="p-4 border-b border-border bg-muted/40 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
              <div className="text-xs text-muted-foreground font-mono select-none">langora-demo.mov</div>
              <div className="w-14" /> {/* Spacer to align title center */}
            </div>

            {/* Video container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="/demo.mov"
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 tracking-tight text-foreground">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "AI Vocabulary Builder", desc: "AI tự động tạo danh sách từ vựng thông minh theo chủ đề bạn quan tâm." },
            { icon: Layers, title: "Smart Flashcards", desc: "Hệ thống học lặp lại ngắt quãng (SRS) giúp ghi nhớ kiến thức vĩnh viễn." },
            { icon: PenLine, title: "AI Writing Coach", desc: "Sửa lỗi ngữ pháp và gợi ý cách diễn đạt tự nhiên như người bản xứ." },
            { icon: BarChart2, title: "Learning Path", desc: "Lộ trình học tập thích ứng cá nhân hóa hoàn toàn theo năng lực hiện tại." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight text-foreground">Quy trình học tập tối ưu</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full h-0.5 bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
              {[
                { n: 1, title: "Chọn mục tiêu", desc: "IELTS, Giao tiếp, JLPT..." },
                { n: 2, title: "Học từ vựng", desc: "Thông qua SRS thông minh" },
                { n: 3, title: "Luyện viết", desc: "Thực hành với chủ đề thực tế" },
                { n: 4, title: "Nhận phản hồi", desc: "AI sửa lỗi ngay lập tức" },
                { n: 5, title: "Theo dõi tiến độ", desc: "Báo cáo học tập hàng tuần" },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-4 shadow-lg shadow-primary/20 z-10">
                    {n}
                  </div>
                  <h4 className="font-bold mb-1 text-sm text-foreground">{title}</h4>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 tracking-tight text-foreground">Được tin dùng bởi hàng ngàn học viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Minh Trí", role: "IELTS Learner (8.0 Target)", quote: "Langora thực sự thay đổi cách mình học writing. Phản hồi từ AI cực kỳ chi tiết và giúp mình nhận ra những lỗi ngữ pháp trước đây luôn bỏ qua.", avatar: "/avatar/person-1.jpg" },
            { name: "Phương Anh", role: "Business English", quote: "Giao diện hiện đại, tối giản giúp mình tập trung hoàn toàn vào việc học. Hệ thống Flashcard rất gây nghiện và hiệu quả cho từ vựng chuyên ngành.", featured: true, avatar: "/avatar/person-2.jpg" },
            { name: "Quốc Bảo", role: "Japanese Learner", quote: "Việc học tiếng Nhật trở nên dễ dàng hơn rất nhiều. AI Coach giải thích các cấu trúc ngữ pháp phức tạp một cách rất dễ hiểu.", avatar: "/avatar/person-3.jpg" },
          ].map(({ name, role, quote, featured, avatar }) => (
            <div
              key={name}
              className={`glass p-6 rounded-xl ${featured ? "border-2 border-primary/30 shadow-lg shadow-primary/10" : ""}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar size="lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-sm text-foreground">{name}</div>
                  <div className="text-xs text-primary">{role}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 tracking-tight text-foreground">Lựa chọn gói học tập của bạn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Miễn phí",
              price: "0đ",
              period: "/tháng",
              features: [
                { text: "Học 20 từ vựng mỗi ngày", ok: true },
                { text: "AI Writing basic (3 bài/tuần)", ok: true },
                { text: "Không có lộ trình cá nhân", ok: false },
              ],
              cta: "Bắt đầu ngay",
              featured: false,
            },
            {
              name: "Pro",
              price: "199k",
              period: "/tháng",
              features: [
                { text: "Từ vựng không giới hạn", ok: true },
                { text: "AI Writing Coach không giới hạn", ok: true },
                { text: "Lộ trình học tập thông minh", ok: true },
                { text: "Hỗ trợ ưu tiên 24/7", ok: true },
              ],
              cta: "Nâng cấp Pro",
              featured: true,
              badge: "Phổ biến nhất",
            },
            {
              name: "Premium AI",
              price: "450k",
              period: "/tháng",
              features: [
                { text: "Mọi tính năng của bản Pro", ok: true },
                { text: "Luyện nói trực tiếp với AI", ok: true },
                { text: "Phân tích chuyên sâu IELTS/TOEIC", ok: true },
              ],
              cta: "Liên hệ tư vấn",
              featured: false,
            },
          ].map(({ name, price, period, features, cta, featured, badge }) => (
            <div
              key={name}
              className={`glass p-10 rounded-2xl flex flex-col relative ${featured ? "border-2 border-primary shadow-2xl shadow-primary/20" : "border border-border"}`}
            >
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {badge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-foreground">{name}</h3>
                <div className="text-5xl font-black text-foreground">
                  {price}
                  <span className="text-sm text-muted-foreground font-normal">{period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-10 flex-grow">
                {features.map(({ text, ok }) => (
                  <li key={text} className="flex items-center gap-2 text-sm">
                    {ok ? (
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${featured ? "text-primary" : "text-primary"}`} />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0 text-muted-foreground opacity-30" />
                    )}
                    <span className={ok && featured ? "text-primary font-semibold" : "text-foreground"}>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={featured ? "default" : "outline"}
                className={`w-full py-6 rounded-xl font-bold text-sm transition-all active:scale-95 ${featured ? "shadow-lg shadow-primary/20" : ""
                  }`}
              >
                {cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-2xl p-12 border border-primary/20 ai-radial-glow overflow-hidden relative">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-foreground relative z-10">
              Sẵn sàng nâng cấp kỹ năng ngôn ngữ?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed relative z-10">
              Tham gia cùng hàng nghìn học viên đang học thông minh hơn mỗi ngày với Langora.
            </p>
            <Link href="/register" className="relative z-10">
              <Button size="lg" className="px-10 h-14 rounded-xl font-bold text-base hover:shadow-[0_0_28px_rgba(168,240,106,0.4)]">
                Bắt đầu ngay — Miễn phí
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/40 border-t border-border mt-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 px-12 py-16 max-w-7xl mx-auto">
          <div className="col-span-2">
            <div className="text-xl font-bold mb-4 text-primary">Langora</div>
            <p className="text-sm text-muted-foreground max-w-xs mb-4 leading-relaxed">
              Engineered for cognitive clarity. Nền tảng học ngôn ngữ thế hệ mới được hỗ trợ bởi trí tuệ nhân tạo.
            </p>
            <div className="text-xs text-muted-foreground">© 2024 Langora. Engineered for cognitive clarity.</div>
          </div>
          {[
            { heading: "Product", links: ["Features", "Integrations", "Pricing"] },
            { heading: "Resources", links: ["Documentation", "Help Center", "Community"] },
            { heading: "Contact", links: ["About Us", "Careers", "Blog"] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-primary font-bold mb-4 text-sm">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
