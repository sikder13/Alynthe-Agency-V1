import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { UseCaseCard, VisualScenario1, VisualScenario2, VisualScenario3, VisualScenario4 } from "@/components/cards/UseCaseCard";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/useIsMobile";

const cases = [
  {
    id: "01",
    tag: "FOR TRADES",
    hook: "Never miss a lead while on-site.",
    metric: "100% Lead Capture",
    visual: <VisualScenario1 />
  },
  {
    id: "02",
    tag: "E-COMMERCE",
    hook: "Automated retention that prints money.",
    metric: "+25% LTV Increase",
    visual: <VisualScenario2 />
  },
  {
    id: "03",
    tag: "ENTERPRISE",
    hook: "Unified intelligence from siloed data.",
    metric: "Real-Time Analytics",
    visual: <VisualScenario3 />
  },
  {
    id: "04",
    tag: "NEW WEBSITES",
    hook: "Speed is revenue. We build sub-second loading sites.",
    metric: "90+ Lighthouse Score",
    visual: <VisualScenario4 />
  }
];

export default function UseCases() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Use Cases | AI & Marketing Automation Success Stories | Alynthe",
    description: "See real-world examples of how Alynthe helps businesses automate lead capture, increase customer lifetime value, and build high-performance websites.",
    keywords: "marketing automation case studies, AI automation examples, Indianapolis business automation, lead capture automation",
    canonicalUrl: "https://alynthe.com/use-cases"
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      {isMobile ? (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-indigo-100/40 via-white to-purple-100/40 pointer-events-none" />
      ) : (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[120px]"
            style={{ willChange: "transform" }}
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
            style={{ willChange: "transform" }}
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
      )}

      <div className="relative z-10">
        <Navbar />
        <main>
          <section className="pt-48 pb-24 px-6 md:px-12 container mx-auto text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
                Real-World Impact.
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide max-w-2xl">
                Explore how our team solves specific industry bottlenecks.
              </p>
            </motion.div>
          </section>

          <section className="pb-32 px-6 md:px-12 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((useCase, index) => (
                <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}
