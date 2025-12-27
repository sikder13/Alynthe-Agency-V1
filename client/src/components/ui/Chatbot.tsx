import { MessageCircle, X, Send, Loader2, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  text: string;
  sender: "bot" | "user";
};

function parseMessageContent(text: string): React.ReactNode {
  const bookingPattern = /\[BOOK_BRIEFING\]\((https?:\/\/[^\)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = bookingPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    const url = match[1];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        data-testid="button-book-briefing"
      >
        <Calendar className="w-4 h-4" />
        Book Briefing
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm Sarah, AI Associate at Alynthe. How can I help you scale your business today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInputText("");
    setIsLoading(true);

    const chatHistory = messages.map(m => ({
      role: m.sender === "bot" ? "assistant" : "user",
      content: m.text
    }));
    chatHistory.push({ role: "user", content: userMsg });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullResponse = "";

      setMessages(prev => [...prev, { text: "", sender: "bot" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { text: fullResponse, sender: "bot" };
                  return updated;
                });
              }
            } catch {
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at +1 929 350 8374.", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 md:w-96 overflow-hidden mb-2"
            data-testid="chatbot-window"
          >
            <div className="bg-black p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-medium">S</div>
                <div>
                  <span className="text-white font-medium block">Sarah</span>
                  <span className="text-white/60 text-xs">AI Associate at Alynthe</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/60 hover:text-white"
                data-testid="button-close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-80 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                    msg.sender === "bot" 
                      ? "bg-white rounded-tl-none text-gray-700 shadow-sm" 
                      : "bg-black text-white rounded-tr-none ml-auto"
                  }`}
                  data-testid={`chat-message-${idx}`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.sender === "bot" ? parseMessageContent(msg.text) : msg.text}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.sender !== "bot" && (
                <div className="p-3 rounded-2xl rounded-tl-none bg-white shadow-sm max-w-[85%]">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-black outline-none disabled:bg-gray-100"
                data-testid="input-chat-message"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                data-testid="button-send-message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap hidden md:block"
            >
              <span className="text-sm font-medium text-gray-800">Hi, I'm Sarah</span>
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-t border-gray-100"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-black rotate-90" : "bg-white hover:scale-110"
          }`}
          data-testid="button-toggle-chat"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
               <MessageCircle className="w-6 h-6 text-black" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
