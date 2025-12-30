import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { motion } from "framer-motion";
import { Users, Scale, Cpu } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({
    title: "About Alynthe | Indianapolis Digital Marketing Agency",
    description: "Meet the team behind Alynthe. We're an American-built agency in Indianapolis specializing in AI automation, web development, and digital transformation.",
    keywords: "about Alynthe, Indianapolis marketing team, digital agency Indianapolis, AI automation experts",
    canonicalUrl: "https://alynthe.com/about"
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      {/* Aurora Atmosphere - Fixed Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[120px]"
          animate={{
            x: [-20, 20, -10, -20],
            y: [-10, 10, -20, -10],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-purple-300/20 rounded-full mix-blend-multiply filter blur-[120px]"
          animate={{
            x: [20, -20, 10, 20],
            y: [10, -10, 20, 10],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-32 pb-24">
          {/* Section 1: The Origin */}
          <section className="px-6 md:px-12 container mx-auto mb-32 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-8">
                About Alynthe.
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide max-w-4xl leading-relaxed">
                We built this agency to prove that exceptional work doesn't require exceptional budgets. We bridge the gap between manual chaos and digital order. Quality and scalability aren't enemies; they are partners.
              </p>
            </motion.div>
          </section>

          {/* Section 2: The Philosophy */}
          <section className="px-6 md:px-12 container mx-auto mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Text Stack */}
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors duration-300">
                    <Users className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Builders, not just designers.</h3>
                    <p className="text-gray-500 leading-relaxed">We construct engines for growth.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors duration-300">
                    <Scale className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">What we believe.</h3>
                    <p className="text-gray-500 leading-relaxed">Transparency is currency. Results matter more than jargon. Your growth is our only KPI.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                    <Cpu className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">How we work.</h3>
                    <p className="text-gray-500 leading-relaxed">Strategy first. We listen before we code. Every pixel traces back to a business goal.</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Glowing Shape */}
              <div className="flex justify-center items-center h-full min-h-[400px]">
                <motion.div
                  className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full filter blur-[60px] opacity-60"
                  animate={{
                    scale: [1, 1.2, 0.9, 1],
                    opacity: [0.6, 0.8, 0.5, 0.6],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Section 3: The Architects */}
          <section className="px-6 md:px-12 container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-light text-gray-900 mb-2">The Architects.</h2>
              <p className="text-lg text-gray-500 font-light">The minds behind the machine.</p>
            </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Founder 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <div className="animate-gradient-slow md:animate-none md:bg-neutral-100 aspect-square rounded-lg mb-6 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-neutral-200 relative animate-glow-pulse md:[animation:none]">
                  <img
                    src="/team/shadman.webp"
                    alt="Shadman Khan"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Shadman Khan</h3>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">FOUNDER & CEO</p>
                  <p className="text-gray-600 font-light leading-relaxed mt-4 max-w-sm">
                    The Strategist. A Purdue alumnus and fixture in the Indianapolis tech scene, Shadman has spent 7+ years architecting digital infrastructure for the region's largest Fortune 500 pharmaceutical and financial institutions. He bridges the gap between corporate-grade reliability and agile startup speed.
                  </p>
                </div>
              </motion.div>

              {/* Founder 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="animate-gradient-slow md:animate-none md:bg-neutral-100 aspect-square rounded-lg mb-6 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-neutral-200 relative animate-glow-pulse md:[animation:none]">
                  <img
                    src="/team/udaay.webp"
                    alt="Udaay Sikder"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Udaay Sikder</h3>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">FOUNDER & AI CONSULTANT</p>
                  <p className="text-gray-600 font-light leading-relaxed mt-4 max-w-sm">
                    The Architect. Udaay doesn't just write code; he engineers conversion. A specialist in AI-driven marketing ecosystems, he fuses deep neural networks with high-level digital strategy to build campaigns that don't just reach audiences—they predict them.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
