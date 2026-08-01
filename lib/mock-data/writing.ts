export type WritingTopic = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

export type WritingContentType = {
  id: string;
  name: string;
  description: string;
};

export type WritingExerciseSentence = {
  id: string;
  order: number;
  content: string; // The prompt/hint for this sentence
  suggestions?: {
    vocab: string[];
    grammar: string[];
  };
};

export type WritingExercise = {
  id: string;
  title: string;
  description: string;
  topicId: string;
  contentTypeId: string;
  level: string; // e.g. "B2", "IELTS"
  wordCountTarget: number;
  timeLimitMinutes: number;
  sentences: WritingExerciseSentence[];
};

export const MOCK_WRITING_TOPICS: WritingTopic[] = [
  { id: "t1", name: "IELTS Task 1", description: "Describe graphs, charts, maps or processes.", icon: "BarChart" },
  { id: "t2", name: "IELTS Task 2", description: "Write discursive essays on general topics.", icon: "PenLine" },
  { id: "t3", name: "Business Email", description: "Professional communication and correspondence.", icon: "Mail" },
];

export const MOCK_WRITING_CONTENT_TYPES: WritingContentType[] = [
  { id: "ct1", name: "Essay", description: "Formal structured text" },
  { id: "ct2", name: "Email", description: "Digital correspondence" },
  { id: "ct3", name: "Report", description: "Factual description of data" },
];

export const MOCK_WRITING_EXERCISES: WritingExercise[] = [
  {
    id: "ex1",
    title: "Thư xin nghỉ phép",
    description: "Hãy viết một email gửi cho quản lý của bạn để xin nghỉ phép 2 ngày vì lý do sức khỏe.",
    topicId: "t3",
    contentTypeId: "ct2",
    level: "A2 - B1",
    wordCountTarget: 100,
    timeLimitMinutes: 15,
    sentences: [
      { 
        id: "s1", order: 1, content: "Chào buổi sáng sếp, tôi viết email này để xin nghỉ phép 2 ngày vào thứ Năm và thứ Sáu tuần này.",
        suggestions: {
          vocab: ["Leave of absence", "Take some time off", "This coming Thursday and Friday"],
          grammar: ["I am writing to request...", "I would like to request a leave of absence for..."]
        }
      },
      { 
        id: "s2", order: 2, content: "Tôi cảm thấy không được khỏe từ tối qua và bác sĩ khuyên tôi nên nghỉ ngơi.",
        suggestions: {
          vocab: ["Under the weather", "Unwell", "Advised to rest", "Doctor's orders"],
          grammar: ["I have been feeling unwell since...", "My doctor has advised me to..."]
        }
      },
      { 
        id: "s3", order: 3, content: "Tôi đã bàn giao lại các công việc khẩn cấp cho Mai trong lúc tôi vắng mặt.",
        suggestions: {
          vocab: ["Hand over", "Urgent tasks", "During my absence"],
          grammar: ["I have handed over my urgent tasks to...", "Mai will cover for me while I am away."]
        }
      },
      { 
        id: "s4", order: 4, content: "Tôi sẽ kiểm tra email thỉnh thoảng nếu có việc thực sự gấp.",
        suggestions: {
          vocab: ["Check email occasionally", "Real emergencies"],
          grammar: ["I will check my emails periodically for...", "If there is an absolute emergency, I can be reached via..."]
        }
      },
      { 
        id: "s5", order: 5, content: "Cảm ơn sếp đã hiểu và thông cảm.",
        suggestions: {
          vocab: ["Understanding", "Support"],
          grammar: ["Thank you for your understanding.", "I appreciate your support in this matter."]
        }
      },
      { 
        id: "s6", order: 6, content: "Trân trọng,",
        suggestions: {
          vocab: ["Sincerely", "Best regards", "Kind regards"],
          grammar: []
        }
      }
    ]
  },
  {
    id: "ex2",
    title: "Lợi ích của việc đọc sách",
    description: "Viết một đoạn văn ngắn khoảng 150 chữ bằng tiếng Anh để trình bày về những lợi ích của việc đọc sách mỗi ngày.",
    topicId: "t2",
    contentTypeId: "ct1",
    level: "B1 - B2",
    wordCountTarget: 150,
    timeLimitMinutes: 25,
    sentences: [
      { 
        id: "s1", order: 1, content: "Đọc sách mỗi ngày mang lại rất nhiều lợi ích thiết thực cho chúng ta.",
        suggestions: {
          vocab: ["Practical benefits", "Daily habit", "Bring about"],
          grammar: ["Reading books on a daily basis brings...", "There are numerous practical benefits to..."]
        }
      },
      { 
        id: "s2", order: 2, content: "Đầu tiên, nó giúp mở rộng vốn từ vựng và cải thiện khả năng viết.",
        suggestions: {
          vocab: ["Expand vocabulary", "Enhance writing skills", "Firstly"],
          grammar: ["First and foremost, it helps to...", "Not only does it expand..., but it also improves..."]
        }
      },
      { 
        id: "s3", order: 3, content: "Thứ hai, việc đắm chìm vào một cuốn sách hay có thể làm giảm căng thẳng sau một ngày dài làm việc.",
        suggestions: {
          vocab: ["Immerse oneself in", "Relieve stress", "A long day at work", "Secondly"],
          grammar: ["Secondly, immersing oneself in a good book can...", "It serves as a great way to relieve stress after..."]
        }
      },
      { 
        id: "s4", order: 4, content: "Cuối cùng, nó kích thích trí não và cải thiện sự tập trung tốt hơn so với việc lướt mạng xã hội.",
        suggestions: {
          vocab: ["Stimulate the brain", "Improve concentration", "Scroll through social media", "Finally"],
          grammar: ["Finally, it stimulates the brain and improves...", "Compared to scrolling through social media, it is much better at..."]
        }
      }
    ]
  }
];

export type AiFeedbackContent = {
  score: number; // e.g. 0-100 or 0-9
  grammarScore: number;
  vocabularyScore: number;
  coherenceScore: number;
  overallComment: string;
  improvements: string[];
};

export const getMockAiFeedback = (): AiFeedbackContent => ({
  score: 7.5,
  grammarScore: 7.0,
  vocabularyScore: 8.0,
  coherenceScore: 7.5,
  overallComment: "A very solid attempt with clear paragraphing and good use of academic vocabulary. However, there are some minor grammatical errors particularly with complex sentence structures.",
  improvements: [
    "Vary your sentence structures more (use more conditionals and passive voice).",
    "Pay attention to subject-verb agreement in complex clauses.",
    "Use more sophisticated transition words instead of just 'and' or 'but'."
  ]
});
