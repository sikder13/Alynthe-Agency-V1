import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { Chatbot } from "@/components/ui/Chatbot";
import { motion } from "framer-motion";

export default function Services() {
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
  );
}
