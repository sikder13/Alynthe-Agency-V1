import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-black/5 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-primary" /> {/* Geometric Square Logo */}
        <span className="text-lg font-medium tracking-tight">ALYNTHE</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button className="text-sm font-medium hover:text-accent transition-colors duration-300">
          Menu
        </button>
        <button className="px-6 py-2 text-sm font-medium border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300">
          Book Consultation
        </button>
      </div>

      <button className="md:hidden">
        <Menu className="w-6 h-6" />
      </button>
    </motion.nav>
  );
}
