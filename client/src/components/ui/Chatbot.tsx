import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  text: string;
  sender: "bot" | "user";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"init" | "name" | "email" | "goal" | "done">("init");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! 👋 I'm Sarah. How can I help you scale your revenue today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "", goal: "" });
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
      if (step === "init") {
        setStep("name");
        setMessages(prev => [
            ...prev,
            { text: "Hello! I can help you schedule a call. What is your name?", sender: "bot" }
        ]);
      }
    };

    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, [step]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // User message
    const userMsg = inputText;
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInputText("");

    // Bot logic
    setTimeout(() => {
      if (step === "name") {
        setUserData(prev => ({ ...prev, name: userMsg }));
        setStep("email");
        setMessages(prev => [...prev, { text: `Nice to meet you, ${userMsg}. What is your email address?`, sender: "bot" }]);
      } else if (step === "email") {
        setUserData(prev => ({ ...prev, email: userMsg }));
        setStep("goal");
        setMessages(prev => [...prev, { text: "Great. Finally, what is your primary business goal right now?", sender: "bot" }]);
      } else if (step === "goal") {
        setUserData(prev => ({ ...prev, goal: userMsg }));
        setStep("done");
        setMessages(prev => [...prev, { text: "Thanks, a strategist will call you at +1 929 350 8374 shortly.", sender: "bot" }]);
      } else if (step === "init") {
         // Fallback if they type before clicking the button
         setStep("name");
         setMessages(prev => [...prev, { text: "I can help you with that. First, what is your name?", sender: "bot" }]);
      } else if (step === "done") {
         setMessages(prev => [...prev, { text: "We have your info! Is there anything else?", sender: "bot" }]);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 md:w-96 overflow-hidden mb-2"
          >
            <div className="bg-black p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">S</div>
                <span className="text-white font-medium">Sarah from Alynthe</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
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
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={step === "done" ? "Message sent!" : "Type a message..."}
                disabled={step === "done"}
                className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-black outline-none disabled:bg-gray-100"
              />
              <button 
                onClick={handleSend}
                disabled={step === "done"}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <div className="relative group">
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap hidden md:block"
            >
              <span className="text-sm font-medium text-gray-800">Hi, I'm Sarah 👋</span>
              {/* Triangle */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-t border-gray-100"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-black rotate-90" : "bg-white hover:scale-110"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
               <MessageCircle className="w-6 h-6 text-black" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
