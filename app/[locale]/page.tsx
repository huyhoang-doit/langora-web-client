"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Sparkles,
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
import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function LandingPage() {
  const t = useTranslations();
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden font-sans">
      {/* Radial background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ai-radial-glow opacity-30" />
      </div>

      {/* TopNavBar */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Next-Gen Language OS
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight text-heading">
              Master Languages{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Smarter with AI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Build vocabulary, improve writing, and learn faster with personalized AI. Hệ thống học tập
              thông minh dựa trên khoa học nhận thức.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="btn-edu h-14 px-8 text-base border-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Bắt đầu học miễn phí
                </Button>
              </Link>
              <Link href="#demo-section">
                <Button variant="outline" size="lg" className="btn-edu h-14 px-8 text-base border-2 bg-transparent hover:bg-muted text-foreground">
                  Xem bản demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative min-h-[450px] flex items-center justify-center">
            <div className="w-full min-h-[380px] card-edu p-6 relative overflow-hidden bg-card">
              <div className="pb-4 border-b-2 border-border/80 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
              </div>
              <div className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 w-28 bg-muted rounded-lg border-2 border-border/20" />
                  <div className="flex gap-3">
                    <div className="h-8 w-8 bg-muted rounded-full border-2 border-border/20" />
                    <div className="h-8 w-8 bg-muted rounded-full border-2 border-border/20" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-muted rounded-full border-2 border-border/10" />
                  <div className="h-4 w-1/2 bg-muted rounded-full border-2 border-border/10" />
                  <div className="h-4 w-5/6 bg-muted rounded-full border-2 border-border/10" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[65, 85, 40].map((w, i) => (
                    <div key={i} className="bg-muted/50 rounded-xl p-3 border-2 border-border/40">
                      <div className="h-3 w-full bg-background rounded-full overflow-hidden mb-2 border-2 border-border/40">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500" style={{ width: `${w}%` }} />
                      </div>
                      <div className="h-2 w-8 bg-background rounded-full border border-border" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-3 left-0 glass card-edu p-4 w-44 shadow-lg animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">FLASHCARD</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-1 text-heading">木漏れ日</h3>
              <p className="text-xs text-muted-foreground">Japanese • N2</p>
            </div>

            <div className="absolute -bottom-6 right-0 md:right-6 glass card-edu p-5 w-60 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <PenLine className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">AI Coach</span>
              </div>
              <div className="text-sm leading-relaxed text-foreground">
                "I{" "}
                <span className="bg-destructive/20 text-destructive px-1 rounded font-bold">gived</span>{" "}
                <span className="text-primary font-bold">gave</span> her the book."
              </div>
              <div className="mt-2 pt-2 border-t-2 border-border/60 text-xs text-muted-foreground italic">
                "Use past tense for completed actions."
              </div>
            </div>

            <div className="absolute top-16 -right-2 glass card-edu px-4 py-3 flex items-center gap-2 shadow-md">
              <Flame className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Daily Streak</div>
                <div className="text-sm font-bold text-foreground">15 ngày</div>
              </div>
            </div>

            <div className="absolute bottom-10 -left-6 glass card-edu p-4 w-52 shadow-md">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-foreground">XP Progress</span>
                <span className="text-xs text-muted-foreground font-semibold">850/1000</span>
              </div>
              <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border-2 border-border/80">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section id="features" className="bg-card/50 py-16 border-y-2 border-border/80">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { num: "10.000+", label: "Học viên tích cực" },
            { num: "500.000+", label: "Từ vựng đã học" },
            { num: "98%", label: "Hài lòng với AI" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-5xl font-black text-primary mb-2 text-heading">{num}</div>
              <div className="text-sm text-muted-foreground font-bold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-heading">
            Khám phá sức mạnh của <span className="text-primary">Langora</span>
          </h2>
        </div>

        {/* Video Player in Premium Device Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ambient Glow behind the video */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-indigo-500/20 opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000 -z-10" />

          <div className="w-full bg-card rounded-2xl border-2 border-border shadow-2xl overflow-hidden relative group">
            {/* Browser Header Mockup */}
            <div className="p-4 border-b-2 border-border bg-muted/40 flex justify-between items-center">
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
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight text-heading">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "AI Vocabulary Builder", desc: "AI tự động tạo danh sách từ vựng thông minh theo chủ đề bạn quan tâm." },
            { icon: Layers, title: "Smart Flashcards", desc: "Hệ thống học lặp lại ngắt quãng (SRS) giúp ghi nhớ kiến thức vĩnh viễn." },
            { icon: PenLine, title: "AI Writing Coach", desc: "Sửa lỗi ngữ pháp và gợi ý cách diễn đạt tự nhiên như người bản xứ." },
            { icon: BarChart2, title: "Learning Path", desc: "Lộ trình học tập thích ứng cá nhân hóa hoàn toàn theo năng lực hiện tại." },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card-edu card-edu-interactive p-6 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-heading">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-card/20 border-y-2 border-border/80">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-3xl font-black text-center mb-16 tracking-tight text-heading">Quy trình học tập tối ưu</h2>
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
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-black flex items-center justify-center mb-4 shadow-lg shadow-primary/20 z-10 border-2 border-primary-foreground/20">
                    {n}
                  </div>
                  <h4 className="font-bold mb-1 text-sm text-foreground text-heading">{title}</h4>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight text-heading">Được tin dùng bởi hàng ngàn học viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Minh Trí", role: "IELTS Learner (8.0 Target)", quote: "Langora thực sự thay đổi cách mình học writing. Phản hồi từ AI cực kỳ chi tiết và giúp mình nhận ra những lỗi ngữ pháp trước đây luôn bỏ qua.", avatar: "/avatar/person-1.jpg" },
            { name: "Phương Anh", role: "Business English", quote: "Giao diện hiện đại, tối giản giúp mình tập trung hoàn toàn vào việc học. Hệ thống Flashcard rất gây nghiện và hiệu quả cho từ vựng chuyên ngành.", featured: true, avatar: "/avatar/person-2.jpg" },
            { name: "Quốc Bảo", role: "Japanese Learner", quote: "Việc học tiếng Nhật trở nên dễ dàng hơn rất nhiều. AI Coach giải thích các cấu trúc ngữ pháp phức tạp một cách rất dễ hiểu.", avatar: "/avatar/person-3.jpg" },
          ].map(({ name, role, quote, featured, avatar }) => (
            <div
              key={name}
              className={`card-edu card-edu-interactive p-6 ${featured ? "border-primary bg-primary/5 shadow-md" : ""}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="font-bold">{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-sm text-foreground text-heading">{name}</div>
                  <div className="text-xs text-primary font-bold">{role}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight text-heading">Lựa chọn gói học tập của bạn</h2>
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
              className={`card-edu p-10 flex flex-col relative ${featured ? "border-primary bg-primary/5 shadow-md" : "border-border"}`}
            >
              {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2 border-primary-foreground/20 shadow-md">
                  {badge}
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-heading">{name}</h3>
                <div className="text-5xl font-black text-foreground text-heading">
                  {price}
                  <span className="text-sm text-muted-foreground font-normal">{period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-10 flex-grow">
                {features.map(({ text, ok }) => (
                  <li key={text} className="flex items-center gap-2 text-sm">
                    {ok ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0 text-muted-foreground opacity-30" />
                    )}
                    <span className={ok && featured ? "text-primary font-bold" : "text-foreground"}>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={featured ? "default" : "outline"}
                className={`btn-edu w-full py-6 text-sm border-2 ${featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-transparent text-foreground hover:bg-muted"}`}
              >
                {cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-edu p-12 ai-radial-glow overflow-hidden relative">
            <h2 className="text-3xl font-black mb-4 tracking-tight text-foreground relative z-10 text-heading">
              Sẵn sàng nâng cấp kỹ năng ngôn ngữ?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed relative z-10 font-medium">
              Tham gia cùng hàng nghìn học viên đang học thông minh hơn mỗi ngày với Langora và người bạn rồng Ora 🐲.
            </p>
            <Link href="/register" className="relative z-10 inline-block">
              <Button size="lg" className="btn-edu px-10 h-14 text-base border-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Bắt đầu ngay — Miễn phí
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
