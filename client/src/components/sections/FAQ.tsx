import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "How does your pricing work?", answer: "We work on a retainer basis or project-based pricing depending on the scope. Most engagements start with a discovery phase." },
  { question: "What is the typical timeline?", answer: "A typical infrastructure overhaul takes 4-8 weeks, while ongoing growth support is indefinite." },
  { question: "Do you work with startups?", answer: "Yes, we specialize in scaling Series A/B startups that have product-market fit but need operational maturity." },
  { question: "What industries do you serve?", answer: "We are industry-agnostic but have deep expertise in SaaS, FinTech, and E-commerce." },
  { question: "Can you audit our current stack?", answer: "Absolutely. Our Growth Audit is the best way to start identifying bottlenecks in your current system." },
  { question: "Do you offer white-label services?", answer: "We primarily work directly with clients but partner with select agencies for specialized technical implementations." }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group active:scale-[0.98] active:bg-gray-50 transition-all duration-150 rounded-lg -mx-2 px-2 py-1"
      >
        <span className="text-lg md:text-xl font-light text-gray-900 group-hover:text-blue-600 transition-colors">{question}</span>
        <span className="flex-shrink-0 ml-4 p-2 rounded-full border border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600 transition-all">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-500 font-light leading-relaxed max-w-md">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-light text-gray-900 tracking-tight max-w-3xl">
            Ready to grow your business?
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={openChatbot}
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Get started
            </button>
            <button 
              onClick={openChatbot}
              className="px-8 py-4 border border-gray-200 text-gray-900 rounded-full font-medium hover:border-black transition-colors"
            >
              Schedule call
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          <div className="flex flex-col">
            {faqs.slice(0, 3).map((faq, idx) => (
              <FAQItem key={idx} {...faq} />
            ))}
          </div>
          <div className="flex flex-col">
            {faqs.slice(3, 6).map((faq, idx) => (
              <FAQItem key={idx + 3} {...faq} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
