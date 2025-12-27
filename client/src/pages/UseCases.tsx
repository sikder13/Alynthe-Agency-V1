import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { UseCaseCard, VisualScenario1, VisualScenario2, VisualScenario3 } from "@/components/cards/UseCaseCard";
import { motion } from "framer-motion";

const cases = [
  {
    id: "01",
    tag: "FOR TRADES",
    challenge: "Missed calls cost revenue.",
    fix: "An AI Sales Rep that answers 24/7, qualifies leads, and books appointments.",
    metric: "0 Missed Leads",
    visual: <VisualScenario1 />
  },
  {
    id: "02",
    tag: "E-COMMERCE",
    challenge: "One-time buyers don't scale.",
    fix: "Automated post-purchase flows that turn single orders into lifetime value.",
    metric: "+20% Repeat Rate",
    visual: <VisualScenario2 />
  },
  {
    id: "03",
    tag: "ENTERPRISE",
    challenge: "Siloed data kills strategy.",
    fix: "A unified data warehouse that connects every tool into a single source of truth.",
    metric: "Unified Intelligence",
    visual: <VisualScenario3 />
  }
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="pt-48 pb-24 px-6 md:px-12 container mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
              Real-World Impact.
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide max-w-2xl">
              Explore how our architecture solves specific industry bottlenecks.
            </p>
          </motion.div>
        </section>

        {/* Grid Section */}
        <section className="pb-32 px-6 md:px-12 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {cases.map((useCase) => (
              <UseCaseCard key={useCase.id} useCase={useCase} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
