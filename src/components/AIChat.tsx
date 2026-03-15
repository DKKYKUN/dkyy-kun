import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Halo! 👋 Saya AI Assistant untuk portfolio Dkyy. Tanya apa saja tentang skills, projects, atau experience!" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simple local AI responses about the portfolio
    const lowerInput = input.toLowerCase();
    let response = "";

    if (lowerInput.includes("skill") || lowerInput.includes("teknologi")) {
      response = "Dkyy menguasai beberapa teknologi:\n\n**Frontend:** HTML (Advanced), CSS, JavaScript, React, Tailwind CSS, Vite\n**Backend:** Node.js, Express.js, MongoDB, Supabase\n**Tools:** Git & GitHub, VS Code, Figma\n**AI:** ChatGPT, GitHub Copilot";
    } else if (lowerInput.includes("project") || lowerInput.includes("proyek")) {
      response = "Beberapa project yang sudah dibuat:\n\n1. **Money Tracker** - Fullstack app dengan React + Supabase\n2. **AI Chatbot JSON** - React + Express backend\n3. **RESTful API Service** - Express.js + MongoDB\n4. **Weather App** - Frontend dengan OpenWeather API\n5. **Link Collector** - Fullstack (in progress)\n6. **Personal Portfolio** - HTML & CSS";
    } else if (lowerInput.includes("experience") || lowerInput.includes("pengalaman")) {
      response = "Dkyy memiliki 1+ tahun pengalaman di web development:\n\n• **Front-End Developer** - Self-taught, React & Tailwind\n• **Backend Developer** - RESTful APIs dengan Express.js\n• **Fullstack Developer** - React + Supabase projects\n• **Mahasiswa Teknik Elektro** - Universitas Bengkulu";
    } else if (lowerInput.includes("siapa") || lowerInput.includes("who") || lowerInput.includes("about")) {
      response = "Dkyy Alfasi adalah mahasiswa Teknik Elektro di Universitas Bengkulu yang passionate di web development. Lahir 8 Agustus 2006 di Klaten, Indonesia. Motto: \"Focus on purpose not girls because gf is temporary, success is permanent\" 😎";
    } else if (lowerInput.includes("contact") || lowerInput.includes("kontak") || lowerInput.includes("hubungi")) {
      response = "Kamu bisa menghubungi Dkyy melalui:\n\n• **GitHub:** github.com/DKKYKUN\n• **Instagram:** @mdkyalfsy\n• **Twitter:** @AlfasiDicky\n\nAtau gunakan form di bagian Contact!";
    } else if (lowerInput.includes("halo") || lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hai")) {
      response = "Halo! 😊 Senang bertemu denganmu! Saya bisa membantu kamu mengetahui lebih banyak tentang Dkyy. Tanyakan tentang skills, projects, experience, atau apapun!";
    } else {
      response = "Terima kasih pertanyaannya! Saya bisa memberikan info tentang:\n\n• **Skills & Teknologi** yang dikuasai\n• **Projects** yang sudah dibuat\n• **Experience** & pengalaman\n• **About** - tentang Dkyy\n• **Contact** - cara menghubungi\n\nSilakan tanya salah satu topik di atas! 😊";
    }

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}
      >
        <MessageSquare size={22} className="text-primary-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] h-[440px] flex flex-col overflow-hidden rounded-2xl"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Bot size={16} className="text-primary" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI Assistant</p>
                  <p className="text-[10px] text-muted-foreground">Powered by ChatGPT</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={18} /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary/10" : "bg-secondary"}`}>
                    {m.role === "user" ? <User size={12} className="text-primary" /> : <Bot size={12} className="text-muted-foreground" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"><Bot size={12} className="text-muted-foreground" /></div>
                  <div className="bg-secondary rounded-xl px-3 py-2 text-xs text-muted-foreground">Typing...</div>
                </div>
              )}
            </div>

            <div className="bg-card border-t border-border px-3 py-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ask me anything..."
              />
              <button onClick={sendMessage} disabled={loading} className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-50">
                <Send size={12} className="text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
