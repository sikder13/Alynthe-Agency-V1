import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { Chatbot } from "@/components/ui/Chatbot";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

export default function Services() {
  useSEO({
    title: "Digital Marketing & AI Automation Services | Alynthe Indianapolis",
    description: "Expert web development, AI marketing automation, and growth engine services in Indianapolis. We build scalable digital solutions for modern businesses.",
    keywords: "web design Indianapolis, marketing automation services, AI agents Indianapolis, CRM integration, sales funnel optimization, Indianapolis web development agency",
    canonicalUrl: "https://alynthe.com/services",
    ogImage: "https://alynthe.com/opengraph.jpg"
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Aurora Atmosphere - Fixed Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-[100px]"
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
          className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-purple-100/40 rounded-full mix-blend-multiply filter blur-[100px]"
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
        <main>
          {/* Header Section */}
          <section className="pt-48 pb-24 px-6 md:px-12 container mx-auto text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
                Our Expertise
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide">
                Engineered for growth.
              </p>
            </motion.div>
          </section>

          {/* Scroll Section */}
          <ServicesScroll />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
