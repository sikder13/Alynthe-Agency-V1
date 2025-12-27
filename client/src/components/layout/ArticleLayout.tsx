import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { motion } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
}

export default function ArticleLayout({ children, title, excerpt, date, tag }: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      {/* Background Subtle */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", 
          backgroundSize: "40px 40px" 
        }} 
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block w-24 flex-shrink-0 sticky top-32 h-fit">
               <div className="flex flex-col gap-6 items-center">
                 <div className="p-3 rounded-full bg-gray-50 text-gray-400">
                    <Share2 className="w-5 h-5" />
                 </div>
                 <div className="w-px h-12 bg-gray-100"></div>
                 <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-blue-700 transition-colors">
                    <Linkedin className="w-5 h-5" />
                 </button>
               </div>
            </aside>

            {/* Main Content */}
            <article className="max-w-3xl mx-auto w-full">
              {/* Header */}
              <header className="mb-12 md:mb-16">
                 <div className="flex items-center gap-3 text-sm font-medium tracking-wider text-indigo-600 mb-6 uppercase">
                    <span>{tag}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{date}</span>
                 </div>
                 <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight mb-8"
                 >
                    {title}
                 </motion.h1>
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed border-l-4 border-indigo-100 pl-6"
                 >
                    {excerpt}
                 </motion.p>
              </header>

              {/* Content Body */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="prose prose-lg prose-gray max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-indigo-600 prose-img:rounded-xl"
              >
                 {children}
              </motion.div>

              {/* Mobile Share (Bottom) */}
              <div className="lg:hidden mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Share this article</span>
                 <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-blue-600"><Facebook className="w-5 h-5" /></button>
                    <button className="text-gray-400 hover:text-blue-400"><Twitter className="w-5 h-5" /></button>
                    <button className="text-gray-400 hover:text-blue-700"><Linkedin className="w-5 h-5" /></button>
                 </div>
              </div>
            </article>

          </div>
        </main>

        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
