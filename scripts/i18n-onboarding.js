const fs = require('fs');
const path = require('path');

const locales = ['en', 'vi', 'ja', 'zh'];
const messagesDir = path.join(__dirname, '../messages');

const onboardingData = {
  en: {
    welcome: {
      step: "Onboarding Step 1 of 6",
      title: "Welcome to Langora!",
      desc: "Let's customize your linguistic journey. We'll set up your target language, evaluate your goals, and estimate your initial proficiency level.",
      time_val: "2 min",
      time_lbl: "Estimated time",
      flow_val: "AI-guided",
      flow_lbl: "Flow style",
      start_btn: "Let's Start",
      copyright: "© 2024 Langora. Engineered for cognitive clarity."
    },
    language: {
      step: "Onboarding Step 2 of 6",
      title: "What language do you want to learn?",
      desc: "Select your target language. You can change this later.",
      en_label: "English",
      en_native: "Tiếng Anh",
      en_desc: "Learn grammar, professional vocab, or prep for IELTS/TOEIC.",
      ja_label: "Japanese",
      ja_native: "日本語",
      ja_desc: "Master kanji, JLPT vocabulary, and natural speaking.",
      zh_label: "Chinese",
      zh_native: "中文",
      zh_desc: "Practice tones, HSK vocab, and characters (Coming Soon).",
      back: "Back",
      continue: "Continue"
    },
    goal: {
      step: "Onboarding Step 3 of 6",
      title: "What is your learning goal?",
      desc: "We will personalize your roadmap to focus on these topics.",
      ielts_label: "IELTS Certification",
      ielts_desc: "Focus on formal vocabulary, academic essays, and coherence.",
      toeic_label: "TOEIC Certification",
      toeic_desc: "Focus on corporate vocabulary, emails, and active grammar.",
      business_label: "Business English / Communication",
      business_desc: "Prepare for negotiations, corporate presentations, and writing emails.",
      travel_label: "Travel & Everyday Speech",
      travel_desc: "Improve basic dialogues, vocab, and speaking fluency."
    },
    level: {
      step: "Onboarding Step 4 of 6",
      title: "Estimate your current level",
      desc: "This helps us feed the right content to your AI recommendations.",
      beginner_label: "Absolute Beginner",
      beginner_desc: "I am starting from scratch. I don't know basic vocabulary or grammar yet.",
      intermediate_label: "Intermediate Learner",
      intermediate_desc: "I can construct basic paragraphs and comprehend slow conversations.",
      advanced_label: "Advanced Speaker",
      advanced_desc: "I communicate fluently but need to master complex grammar and style structures.",
      unsure_label: "I am not sure (Recommend Placement Test)",
      unsure_desc: "Take a 5-minute AI assessment to test your reading, vocab, and syntax."
    },
    placement: {
      title: "AI Placement Test",
      question_progress: "Question {current} of {total}",
      instruction: "Choose the word that best fits the sentence below:",
      quit: "Quit Test",
      next: "Next Question",
      loading: "Ora is analyzing your level..."
    },
    result: {
      complete: "AI Assessment Complete",
      level: "Your Level: {level}",
      proficiency: "Upper-Intermediate proficiency in English",
      vocab_mastery: "Vocabulary mastery: {percent}%",
      vocab_desc: "Strong in general business, moderate in science.",
      writing_coherence: "Writing coherence: {percent}%",
      writing_desc: "Clear logical flow. Minor errors in complex tenses.",
      ai_recommendation: "AI Recommendation",
      ai_desc: "We've created a custom roadmap for you. We suggest focusing on 'Conditional Structures' in grammar and 'Negotiation Idioms' in vocabulary.",
      enter_dashboard: "Enter My Dashboard"
    }
  },
  vi: {
    welcome: {
      step: "Bước 1 / 6",
      title: "Chào mừng đến với Langora!",
      desc: "Hãy tùy chỉnh lộ trình ngôn ngữ của bạn. Chúng tôi sẽ thiết lập ngôn ngữ mục tiêu, đánh giá mục tiêu và ước tính trình độ ban đầu của bạn.",
      time_val: "2 phút",
      time_lbl: "Thời gian ước tính",
      flow_val: "Có AI hướng dẫn",
      flow_lbl: "Kiểu thiết lập",
      start_btn: "Bắt đầu nào",
      copyright: "© 2024 Langora. Thiết kế cho sự rõ ràng trong nhận thức."
    },
    language: {
      step: "Bước 2 / 6",
      title: "Bạn muốn học ngôn ngữ nào?",
      desc: "Chọn ngôn ngữ mục tiêu của bạn. Bạn có thể thay đổi sau.",
      en_label: "Tiếng Anh",
      en_native: "English",
      en_desc: "Học ngữ pháp, từ vựng chuyên ngành hoặc luyện thi IELTS/TOEIC.",
      ja_label: "Tiếng Nhật",
      ja_native: "日本語",
      ja_desc: "Thành thạo Kanji, từ vựng JLPT và giao tiếp tự nhiên.",
      zh_label: "Tiếng Trung",
      zh_native: "中文",
      zh_desc: "Luyện phát âm, từ vựng HSK và chữ Hán (Sắp ra mắt).",
      back: "Quay lại",
      continue: "Tiếp tục"
    },
    goal: {
      step: "Bước 3 / 6",
      title: "Mục tiêu học tập của bạn là gì?",
      desc: "Chúng tôi sẽ cá nhân hóa lộ trình của bạn để tập trung vào các chủ đề này.",
      ielts_label: "Chứng chỉ IELTS",
      ielts_desc: "Tập trung vào từ vựng học thuật, bài luận và sự mạch lạc.",
      toeic_label: "Chứng chỉ TOEIC",
      toeic_desc: "Tập trung vào từ vựng doanh nghiệp, email và ngữ pháp.",
      business_label: "Tiếng Anh Thương mại / Giao tiếp",
      business_desc: "Chuẩn bị cho đàm phán, thuyết trình và viết email.",
      travel_label: "Du lịch & Giao tiếp hàng ngày",
      travel_desc: "Cải thiện các đoạn hội thoại cơ bản, từ vựng và độ trôi chảy."
    },
    level: {
      step: "Bước 4 / 6",
      title: "Ước tính trình độ hiện tại của bạn",
      desc: "Điều này giúp chúng tôi cung cấp nội dung phù hợp cho các đề xuất AI.",
      beginner_label: "Người mới bắt đầu",
      beginner_desc: "Tôi bắt đầu từ con số 0. Tôi chưa biết từ vựng hoặc ngữ pháp cơ bản.",
      intermediate_label: "Người học trung cấp",
      intermediate_desc: "Tôi có thể viết các đoạn văn cơ bản và hiểu các cuộc hội thoại chậm.",
      advanced_label: "Người nói thành thạo",
      advanced_desc: "Tôi giao tiếp trôi chảy nhưng cần nắm vững các cấu trúc ngữ pháp và văn phong phức tạp.",
      unsure_label: "Tôi không chắc chắn (Khuyên dùng Bài kiểm tra đầu vào)",
      unsure_desc: "Làm bài đánh giá AI dài 5 phút để kiểm tra khả năng đọc, từ vựng và cú pháp của bạn."
    },
    placement: {
      title: "Kiểm tra đầu vào AI",
      question_progress: "Câu hỏi {current} / {total}",
      instruction: "Chọn từ phù hợp nhất với câu dưới đây:",
      quit: "Thoát kiểm tra",
      next: "Câu hỏi tiếp theo",
      loading: "Ora đang phân tích trình độ của bạn..."
    },
    result: {
      complete: "Đánh giá AI hoàn tất",
      level: "Trình độ của bạn: {level}",
      proficiency: "Trình độ tiếng Anh trên trung cấp",
      vocab_mastery: "Thành thạo từ vựng: {percent}%",
      vocab_desc: "Mạnh về tiếng Anh thương mại tổng quát, trung bình ở tiếng Anh khoa học.",
      writing_coherence: "Độ mạch lạc khi viết: {percent}%",
      writing_desc: "Luồng logic rõ ràng. Mắc lỗi nhỏ ở các thì phức tạp.",
      ai_recommendation: "Đề xuất từ AI",
      ai_desc: "Chúng tôi đã tạo một lộ trình tùy chỉnh cho bạn. Bạn nên tập trung vào 'Cấu trúc câu điều kiện' trong ngữ pháp và 'Thành ngữ đàm phán' trong từ vựng.",
      enter_dashboard: "Vào Bảng điều khiển"
    }
  },
  ja: {
    welcome: {
      step: "ステップ 1 / 6",
      title: "Langoraへようこそ！",
      desc: "語学学習の旅をカスタマイズしましょう。学習言語を設定し、目標を評価し、初期の熟練度を推定します。",
      time_val: "2分",
      time_lbl: "予想所要時間",
      flow_val: "AIガイド",
      flow_lbl: "フロースタイル",
      start_btn: "始めましょう",
      copyright: "© 2024 Langora. 認知の明確さのために設計されました。"
    },
    language: {
      step: "ステップ 2 / 6",
      title: "どの言語を学びたいですか？",
      desc: "学習言語を選択してください。後で変更できます。",
      en_label: "英語",
      en_native: "English",
      en_desc: "文法、専門用語を学ぶか、IELTS/TOEICの準備をします。",
      ja_label: "日本語",
      ja_native: "日本語",
      ja_desc: "漢字、JLPTの語彙、自然な会話をマスターします。",
      zh_label: "中国語",
      zh_native: "中文",
      zh_desc: "声調、HSKの語彙、漢字を練習します（近日公開）。",
      back: "戻る",
      continue: "続ける"
    },
    goal: {
      step: "ステップ 3 / 6",
      title: "学習の目標は何ですか？",
      desc: "これらのトピックに焦点を当てるようにロードマップをパーソナライズします。",
      ielts_label: "IELTS 資格",
      ielts_desc: "フォーマルな語彙、アカデミック・エッセイ、一貫性に焦点を当てます。",
      toeic_label: "TOEIC 資格",
      toeic_desc: "企業の語彙、電子メール、アクティブな文法に焦点を当てます。",
      business_label: "ビジネス英語 / コミュニケーション",
      business_desc: "交渉、企業プレゼンテーション、電子メールの作成の準備をします。",
      travel_label: "旅行と日常会話",
      travel_desc: "基本的な対話、語彙、会話の流暢さを向上させます。"
    },
    level: {
      step: "ステップ 4 / 6",
      title: "現在のレベルを推定する",
      desc: "これは、AIの推奨事項に適切なコンテンツを提供するのに役立ちます。",
      beginner_label: "完全な初心者",
      beginner_desc: "ゼロから始めています。基本的な語彙や文法はまだわかりません。",
      intermediate_label: "中級学習者",
      intermediate_desc: "基本的な段落を構成し、ゆっくりとした会話を理解できます。",
      advanced_label: "上級話者",
      advanced_desc: "流暢にコミュニケーションできますが、複雑な文法や文体構造を習得する必要があります。",
      unsure_label: "わからない（レベルチェックテストを推奨）",
      unsure_desc: "5分間のAI評価を受けて、読解力、語彙力、構文をテストします。"
    },
    placement: {
      title: "AI レベルチェックテスト",
      question_progress: "質問 {current} / {total}",
      instruction: "以下の文に最も適した単語を選択してください：",
      quit: "テストを終了",
      next: "次の質問",
      loading: "Oraがあなたのレベルを分析しています..."
    },
    result: {
      complete: "AI 評価完了",
      level: "あなたのレベル: {level}",
      proficiency: "英語の上中級レベル",
      vocab_mastery: "語彙の習熟度: {percent}%",
      vocab_desc: "一般的なビジネスに強く、科学は中程度。",
      writing_coherence: "ライティングの一貫性: {percent}%",
      writing_desc: "明確で論理的な流れ。複雑な時制に軽微なエラーあり。",
      ai_recommendation: "AI のおすすめ",
      ai_desc: "カスタムロードマップを作成しました。文法では「条件文」、語彙では「交渉のイディオム」に焦点を当てることをお勧めします。",
      enter_dashboard: "ダッシュボードに入る"
    }
  },
  zh: {
    welcome: {
      step: "第 1 步 / 共 6 步",
      title: "欢迎来到 Langora！",
      desc: "让我们定制您的语言之旅。我们将设置您的目标语言，评估您的目标，并估算您的初始熟练程度。",
      time_val: "2 分钟",
      time_lbl: "预计时间",
      flow_val: "AI 引导",
      flow_lbl: "流程样式",
      start_btn: "让我们开始吧",
      copyright: "© 2024 Langora. 为认知清晰而设计。"
    },
    language: {
      step: "第 2 步 / 共 6 步",
      title: "您想学习什么语言？",
      desc: "选择您的目标语言。您可以稍后更改。",
      en_label: "英语",
      en_native: "English",
      en_desc: "学习语法、专业词汇或准备 IELTS/TOEIC。",
      ja_label: "日语",
      ja_native: "日本語",
      ja_desc: "掌握汉字、JLPT 词汇和自然口语。",
      zh_label: "中文",
      zh_native: "中文",
      zh_desc: "练习声调、HSK 词汇和汉字（即将推出）。",
      back: "返回",
      continue: "继续"
    },
    goal: {
      step: "第 3 步 / 共 6 步",
      title: "您的学习目标是什么？",
      desc: "我们将个性化您的路线图以专注于这些主题。",
      ielts_label: "IELTS 认证",
      ielts_desc: "专注于正式词汇、学术论文和连贯性。",
      toeic_label: "TOEIC 认证",
      toeic_desc: "专注于企业词汇、电子邮件和主动语法。",
      business_label: "商务英语 / 沟通",
      business_desc: "准备谈判、企业演示和撰写电子邮件。",
      travel_label: "旅行和日常对话",
      travel_desc: "提高基本对话、词汇和口语流利度。"
    },
    level: {
      step: "第 4 步 / 共 6 步",
      title: "估算您当前的水平",
      desc: "这有助于我们为您的 AI 推荐提供合适的内容。",
      beginner_label: "绝对初学者",
      beginner_desc: "我从零开始。我还不知道基本的词汇或语法。",
      intermediate_label: "中级学习者",
      intermediate_desc: "我能构建基本的段落并理解缓慢的对话。",
      advanced_label: "高级讲者",
      advanced_desc: "我能流利地沟通，但需要掌握复杂的语法和文体结构。",
      unsure_label: "我不确定（推荐分级测试）",
      unsure_desc: "参加 5 分钟的 AI 评估以测试您的阅读、词汇和语法。"
    },
    placement: {
      title: "AI 分级测试",
      question_progress: "问题 {current} / {total}",
      instruction: "选择最适合以下句子的单词：",
      quit: "退出测试",
      next: "下一个问题",
      loading: "Ora正在分析你的水平..."
    },
    result: {
      complete: "AI 评估完成",
      level: "您的水平：{level}",
      proficiency: "英语中高级水平",
      vocab_mastery: "词汇掌握度：{percent}%",
      vocab_desc: "通用商务方面较强，科学方面中等。",
      writing_coherence: "写作连贯性：{percent}%",
      writing_desc: "逻辑流程清晰。复杂时态有轻微错误。",
      ai_recommendation: "AI 推荐",
      ai_desc: "我们为您创建了自定义路线图。建议您重点关注语法中的“条件结构”和词汇中的“谈判成语”。",
      enter_dashboard: "进入我的仪表板"
    }
  }
};

const commonDataAdditions = {
  en: {
    pricing: {
      badge: "Transparent Pricing",
      title: "Invest in Your",
      title_highlight: "Language Skills",
      desc: "Choose a plan that matches your learning goals. No hidden fees.",
      period: "/month",
      guarantee: "All paid plans come with a 7-day money-back guarantee. Try Langora risk-free and feel the difference.",
      plan_free_name: "Free",
      plan_free_cta: "Start Learning",
      plan_free_feat1: "Learn 20 words per day",
      plan_free_feat2: "AI Writing basic (3 lessons/week)",
      plan_free_feat3: "Personalized Roadmap",
      plan_free_feat4: "Real-time AI speaking coach",
      plan_pro_name: "Pro",
      plan_pro_badge: "Most Popular",
      plan_pro_cta: "Upgrade to Pro",
      plan_pro_feat1: "Unlimited Vocabulary learning",
      plan_pro_feat2: "Unlimited AI Writing Coach corrections",
      plan_pro_feat3: "Personalized Adaptive Roadmap",
      plan_pro_feat4: "Premium speaking simulations",
      plan_premium_name: "Premium AI",
      plan_premium_cta: "Upgrade to Premium",
      plan_premium_feat1: "Everything in Pro plan",
      plan_premium_feat2: "Voice Conversational Coaching with Ora",
      plan_premium_feat3: "Deep IELTS / TOEIC speech & essay evaluation",
      plan_premium_feat4: "Priority access to new AI models"
    },
    terms: {
      badge: "Terms of Service",
      title: "Clear &",
      title_highlight: "Fair Terms",
      last_updated: "Last updated: June 5, 2026",
      contact_prompt: "Have questions about our terms?",
      contact_link: "Reach out to our legal team",
      contact_end: "— we are happy to clarify.",
      sec1_title: "1. User Agreement",
      sec1_content: "By accessing Langora, you agree to comply with our code of conduct, respect intellectual property, and maintain secure passwords for your dashboard credentials.",
      sec2_title: "2. Pro/Premium Subscriptions",
      sec2_content: "Subscriptions to Pro and Premium packages are billed monthly or annually. Cancellation takes effect at the end of the current billing cycle. Refunds are processed according to our specific refund criteria.",
      sec3_title: "3. Acceptable Use of AI",
      sec3_content: "Our writing checkers and oral companions are for educational purposes. Any exploitation of the underlying API, automated extraction of language assets, or generation of prohibited materials will result in immediate suspension.",
      sec4_title: "4. Intellectual Property",
      sec4_content: "All AI-generated content, course materials, and vocabulary datasets are the intellectual property of Langora and its licensors. Redistribution of content outside the platform is strictly prohibited."
    },
    blog: {
      badge: "Langora Insights",
      title: "Language &",
      title_highlight: "AI Research",
      desc: "Linguistic insights, AI research, and actionable learning strategies from our engineering team.",
      post1_title: "How Cognitive Science and Spaced Repetition Supercharges Vocabulary Learning",
      post1_desc: "An in-depth look at how the forgetting curve governs language retention and how SRS algorithms optimize flashcard study intervals.",
      post1_cat: "Methodology",
      post2_title: "Beyond Autocorrect: How AI Can Teach You to Write Like a Native Speaker",
      post2_desc: "Traditional grammar checkers only fix typos. Discover how LLMs provide context-specific style suggestions to enhance your written expression.",
      post2_cat: "AI Technology",
      post3_title: "Step-by-Step Writing Plan for Reaching IELTS Band 8.0+",
      post3_desc: "Actionable tips, templates, and vocabulary lists tailored for advanced candidates preparing for academic writing tasks.",
      post3_cat: "IELTS Prep"
    }
  },
  vi: {
    pricing: {
      badge: "Bảng giá minh bạch",
      title: "Đầu tư vào",
      title_highlight: "Kỹ năng ngoại ngữ",
      desc: "Chọn gói phù hợp với mục tiêu học tập của bạn. Không có phí ẩn.",
      period: "/tháng",
      guarantee: "Tất cả các gói trả phí đều có chính sách hoàn tiền trong 7 ngày. Hãy dùng thử Langora không rủi ro và cảm nhận sự khác biệt.",
      plan_free_name: "Cơ bản",
      plan_free_cta: "Bắt đầu học",
      plan_free_feat1: "Học 20 từ mỗi ngày",
      plan_free_feat2: "Chữa bài viết cơ bản (3 bài/tuần)",
      plan_free_feat3: "Lộ trình cá nhân hóa",
      plan_free_feat4: "Huấn luyện viên nói AI thời gian thực",
      plan_pro_name: "Pro",
      plan_pro_badge: "Phổ biến nhất",
      plan_pro_cta: "Nâng cấp lên Pro",
      plan_pro_feat1: "Học từ vựng không giới hạn",
      plan_pro_feat2: "Chữa bài viết không giới hạn",
      plan_pro_feat3: "Lộ trình thích ứng cá nhân hóa",
      plan_pro_feat4: "Mô phỏng hội thoại cao cấp",
      plan_premium_name: "Premium AI",
      plan_premium_cta: "Nâng cấp lên Premium",
      plan_premium_feat1: "Mọi tính năng của gói Pro",
      plan_premium_feat2: "Huấn luyện hội thoại bằng giọng nói với Ora",
      plan_premium_feat3: "Đánh giá sâu IELTS/TOEIC cho bài nói và viết",
      plan_premium_feat4: "Quyền truy cập ưu tiên vào các mô hình AI mới"
    },
    terms: {
      badge: "Điều khoản dịch vụ",
      title: "Điều khoản",
      title_highlight: "Rõ ràng & Công bằng",
      last_updated: "Cập nhật lần cuối: 5 tháng 6, 2026",
      contact_prompt: "Bạn có câu hỏi về điều khoản của chúng tôi?",
      contact_link: "Liên hệ với nhóm pháp lý",
      contact_end: "— chúng tôi rất sẵn lòng giải đáp.",
      sec1_title: "1. Thỏa thuận người dùng",
      sec1_content: "Bằng cách truy cập Langora, bạn đồng ý tuân thủ quy tắc ứng xử của chúng tôi, tôn trọng tài sản trí tuệ và bảo mật mật khẩu cho thông tin đăng nhập.",
      sec2_title: "2. Gói Pro/Premium",
      sec2_content: "Đăng ký gói Pro và Premium được lập hóa đơn hàng tháng hoặc hàng năm. Việc hủy có hiệu lực vào cuối chu kỳ thanh toán hiện tại. Chế độ hoàn tiền được áp dụng theo tiêu chí hoàn tiền cụ thể của chúng tôi.",
      sec3_title: "3. Sử dụng AI hợp lệ",
      sec3_content: "Các công cụ kiểm tra văn bản và bạn đồng hành nói của chúng tôi nhằm mục đích giáo dục. Việc khai thác API cơ sở, trích xuất tự động tài sản ngôn ngữ hoặc tạo tài liệu cấm sẽ dẫn đến việc đình chỉ ngay lập tức.",
      sec4_title: "4. Tài sản trí tuệ",
      sec4_content: "Tất cả nội dung do AI tạo ra, tài liệu khóa học và bộ dữ liệu từ vựng đều là tài sản trí tuệ của Langora và những người cấp phép. Nghiêm cấm phân phối nội dung ra ngoài nền tảng."
    },
    blog: {
      badge: "Thông tin Langora",
      title: "Ngôn ngữ &",
      title_highlight: "Nghiên cứu AI",
      desc: "Những hiểu biết về ngôn ngữ học, nghiên cứu AI và chiến lược học tập từ đội ngũ kỹ sư của chúng tôi.",
      post1_title: "Khoa học nhận thức và Lặp lại ngắt quãng tăng tốc độ học từ vựng như thế nào",
      post1_desc: "Cái nhìn sâu sắc về cách đường cong lãng quên chi phối khả năng ghi nhớ ngôn ngữ và thuật toán SRS tối ưu hóa khoảng thời gian học flashcard.",
      post1_cat: "Phương pháp luận",
      post2_title: "Vượt xa tính năng Tự động sửa lỗi: Cách AI có thể dạy bạn viết như người bản xứ",
      post2_desc: "Trình kiểm tra ngữ pháp truyền thống chỉ sửa lỗi chính tả. Khám phá cách LLM cung cấp đề xuất phong cách theo ngữ cảnh để nâng cao biểu đạt văn bản của bạn.",
      post2_cat: "Công nghệ AI",
      post3_title: "Kế hoạch viết từng bước để đạt điểm IELTS 8.0+",
      post3_desc: "Các mẹo hữu ích, mẫu và danh sách từ vựng được thiết kế riêng cho thí sinh nâng cao chuẩn bị cho các bài viết học thuật.",
      post3_cat: "Luyện thi IELTS"
    }
  },
  ja: {
    pricing: {
      badge: "透明な価格設定",
      title: "への投資",
      title_highlight: "あなたの言語スキル",
      desc: "学習目標に合ったプランをお選びください。隠れた費用はありません。",
      period: "/月",
      guarantee: "すべての有料プランには7日間の返金保証が付いています。Langoraをリスクなしでお試しください。",
      plan_free_name: "無料",
      plan_free_cta: "学習を開始",
      plan_free_feat1: "1日20単語を学ぶ",
      plan_free_feat2: "AIライティング基本（週3レッスン）",
      plan_free_feat3: "パーソナライズされたロードマップ",
      plan_free_feat4: "リアルタイムAIスピーキングコーチ",
      plan_pro_name: "プロ",
      plan_pro_badge: "一番人気",
      plan_pro_cta: "プロにアップグレード",
      plan_pro_feat1: "無制限の語彙学習",
      plan_pro_feat2: "無制限のAIライティングコーチの修正",
      plan_pro_feat3: "パーソナライズされた適応型ロードマップ",
      plan_pro_feat4: "プレミアムスピーキングシミュレーション",
      plan_premium_name: "プレミアム AI",
      plan_premium_cta: "プレミアムにアップグレード",
      plan_premium_feat1: "プロプランのすべて",
      plan_premium_feat2: "Oraによる音声会話コーチング",
      plan_premium_feat3: "深いIELTS / TOEICスピーチ＆エッセイ評価",
      plan_premium_feat4: "新しいAIモデルへの優先アクセス"
    },
    terms: {
      badge: "利用規約",
      title: "明確で",
      title_highlight: "公平な条件",
      last_updated: "最終更新日：2026年6月5日",
      contact_prompt: "規約についてご質問がありますか？",
      contact_link: "法務チームにお問い合わせください",
      contact_end: "— 喜んで明確にいたします。",
      sec1_title: "1. ユーザー契約",
      sec1_content: "Langoraにアクセスすることにより、当社の行動規範に従い、知的財産を尊重し、ダッシュボードの認証情報の安全なパスワードを維持することに同意するものとします。",
      sec2_title: "2. プロ/プレミアムサブスクリプション",
      sec2_content: "プロおよびプレミアムパッケージのサブスクリプションは、月単位または年単位で請求されます。キャンセルは、現在の請求サイクルの終了時に有効になります。返金は、特定の返金基準に従って処理されます。",
      sec3_title: "3. AIの許容可能な使用",
      sec3_content: "当社のライティングチェッカーと口頭コンパニオンは教育目的です。基盤となるAPIの悪用、言語資産の自動抽出、または禁止された素材の生成は、直ちに一時停止となります。",
      sec4_title: "4. 知的財産",
      sec4_content: "AIによって生成されたすべてのコンテンツ、コース資料、および語彙データセットは、Langoraおよびそのライセンサーの知的財産です。プラットフォーム外でのコンテンツの再配布は固く禁じられています。"
    },
    blog: {
      badge: "Langoraの洞察",
      title: "言語と",
      title_highlight: "AIリサーチ",
      desc: "エンジニアリングチームからの言語学的洞察、AI研究、および実行可能な学習戦略。",
      post1_title: "認知科学と間隔反復が語彙学習をどのように強化するか",
      post1_desc: "忘却曲線が言語の保持をどのように支配するか、そしてSRSアルゴリズムがフラッシュカードの学習間隔をどのように最適化するかの詳細な説明。",
      post1_cat: "方法論",
      post2_title: "自動修正を超えて：AIがネイティブスピーカーのように書くことをどのように教えることができるか",
      post2_desc: "従来の文法チェッカーはタイプミスを修正するだけです。LLMが文脈固有のスタイル提案を提供して、文章表現を向上させる方法をご覧ください。",
      post2_cat: "AIテクノロジー",
      post3_title: "IELTSバンド8.0+を達成するためのステップバイステップのライティングプラン",
      post3_desc: "アカデミックライティングタスクの準備をしている上級候補者向けに調整された、実行可能なヒント、テンプレート、語彙リスト。",
      post3_cat: "IELTS準備"
    }
  },
  zh: {
    pricing: {
      badge: "透明定价",
      title: "投资您的",
      title_highlight: "语言技能",
      desc: "选择符合您学习目标的计划。没有隐藏费用。",
      period: "/月",
      guarantee: "所有付费计划均提供 7 天退款保证。无风险试用 Langora，感受与众不同。",
      plan_free_name: "免费",
      plan_free_cta: "开始学习",
      plan_free_feat1: "每天学习 20 个单词",
      plan_free_feat2: "AI 写作基础（每周 3 节课）",
      plan_free_feat3: "个性化路线图",
      plan_free_feat4: "实时 AI 口语教练",
      plan_pro_name: "专业版",
      plan_pro_badge: "最受欢迎",
      plan_pro_cta: "升级至专业版",
      plan_pro_feat1: "无限词汇学习",
      plan_pro_feat2: "无限 AI 写作教练批改",
      plan_pro_feat3: "个性化自适应路线图",
      plan_pro_feat4: "高级口语模拟",
      plan_premium_name: "高级 AI",
      plan_premium_cta: "升级至高级版",
      plan_premium_feat1: "专业版的所有功能",
      plan_premium_feat2: "Ora 的语音对话辅导",
      plan_premium_feat3: "深度 IELTS / TOEIC 演讲和论文评估",
      plan_premium_feat4: "优先访问新 AI 模型"
    },
    terms: {
      badge: "服务条款",
      title: "清晰和",
      title_highlight: "公平的条款",
      last_updated: "最后更新：2026年6月5日",
      contact_prompt: "对我们的条款有疑问？",
      contact_link: "联系我们的法律团队",
      contact_end: "——我们很乐意为您解答。",
      sec1_title: "1. 用户协议",
      sec1_content: "访问 Langora，即表示您同意遵守我们的行为准则，尊重知识产权，并维护仪表板凭据的安全密码。",
      sec2_title: "2. 专业/高级订阅",
      sec2_content: "专业和高级套餐的订阅按月或按年计费。取消将在当前计费周期结束时生效。退款根据我们特定的退款标准进行处理。",
      sec3_title: "3. AI 的可接受使用",
      sec3_content: "我们的写作检查器和口语伴侣用于教育目的。任何利用底层 API、自动提取语言资产或生成违禁材料的行为将导致立即暂停。",
      sec4_title: "4. 知识产权",
      sec4_content: "所有 AI 生成的内容、课程材料和词汇数据集均为 Langora 及其许可方的知识产权。严禁在平台外重新分发内容。"
    },
    blog: {
      badge: "Langora 见解",
      title: "语言与",
      title_highlight: "AI 研究",
      desc: "来自我们工程团队的语言学见解、AI 研究和可行的学习策略。",
      post1_title: "认知科学和间隔重复如何增强词汇学习",
      post1_desc: "深入探讨遗忘曲线如何影响语言记忆，以及 SRS 算法如何优化抽认卡学习间隔。",
      post1_cat: "方法论",
      post2_title: "超越自动更正：AI 如何教您像母语人士一样写作",
      post2_desc: "传统的语法检查器仅修复错别字。了解 LLM 如何提供特定上下文的风格建议以增强您的书面表达。",
      post2_cat: "AI 技术",
      post3_title: "达到 IELTS 8.0+ 的逐步写作计划",
      post3_desc: "为准备学术写作任务的高级候选人量身定制的可行技巧、模板和词汇列表。",
      post3_cat: "IELTS 准备"
    }
  }
};

locales.forEach(locale => {
  const onboardingPath = path.join(messagesDir, locale, 'onboarding.json');
  fs.writeFileSync(onboardingPath, JSON.stringify(onboardingData[locale], null, 2) + '\n');
  console.log(`Created ${onboardingPath}`);

  const commonPath = path.join(messagesDir, locale, 'common.json');
  let commonContent = {};
  if (fs.existsSync(commonPath)) {
    commonContent = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
  }
  commonContent = { ...commonContent, ...commonDataAdditions[locale] };
  fs.writeFileSync(commonPath, JSON.stringify(commonContent, null, 2) + '\n');
  console.log(`Updated ${commonPath}`);
});
