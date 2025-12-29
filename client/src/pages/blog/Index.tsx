import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { PatternOverlay } from "@/components/ui/PatternOverlay";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    id: "roi-of-silence",
    tag: "ROI ANALYSIS",
    date: "DEC 27",
    title: "The ROI of Silence: How AI Turns Busy Work into Revenue.",
    excerpt: "We don't sell software; we sell time. Here's the math behind our 340% ROI claim—no fluff, just numbers.",
    href: "/blog/roi-of-silence",
    gradientVariant: "gold" as const,
    patternVariant: "dataGrid" as const
  },
  {
    id: "agency-dead",
    tag: "STRATEGY",
    date: "OCT 24",
    title: "Why 'Full-Service' Agencies Are Dead: The Rise of the Solutions Architect.",
    excerpt: "The old model was 'more people.' The new model is 'better code.' Why hiring a marketing firm for automation problems is costing you 30% of your revenue.",
    href: "/blog/agency-dead",
    gradientVariant: "purple" as const,
    patternVariant: "pulse" as const
  },
  {
    id: "sales-engine-blueprint",
    tag: "TECHNICAL",
    date: "NOV 02",
    title: "Anatomy of a 24/7 Sales Engine: Cloning a Top Performer.",
    excerpt: "We analyzed 5,000 successful sales calls and encoded the persuasion logic into Python. Here is the blueprint.",
    href: "/blog/sales-engine-blueprint",
    gradientVariant: "teal" as const,
    patternVariant: "dataGrid" as const
  }
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = "Insights | Alynthe";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      {/* Background Subtle */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 container mx-auto">
          
          {/* Header */}
          <div className="mb-20 md:mb-32 text-center md:text-left border-b border-gray-100 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
                Insights.
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide">
                Decoding the logic of growth.
              </p>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {articles.map((article, index) => (
              <Link key={article.id} href={article.href} className="group block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col h-full"
                >
                  {/* Animated Mesh Gradient Cover with Pattern Overlay */}
                  <div className="w-full aspect-[16/9] mb-8 relative overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-lg group-hover:scale-[1.02]">
                    <AnimatedGradient variant={article.gradientVariant} />
                    <PatternOverlay variant={article.patternVariant} />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">
                    <span className="text-indigo-600">{article.tag}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-4 group-hover:text-indigo-900 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-6 flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-2 transition-transform duration-300">
                    READ ARTICLE <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

        </main>
        
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
