import { Link } from "wouter";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20 flex items-center transition-all duration-300">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 border-[1.5px] border-black relative flex items-center justify-center overflow-hidden bg-white">
            {/* Cross (+) */}
            <div className="absolute w-full h-[1.5px] bg-black" />
            <div className="absolute h-full w-[1.5px] bg-black" />
            {/* Diagonal (X) */}
            <div className="absolute w-[141%] h-[1.5px] bg-black rotate-45" />
            <div className="absolute w-[141%] h-[1.5px] bg-black -rotate-45" />
          </div>
          <span className="font-light tracking-tight text-xl text-black">ALYNTHE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-normal text-gray-600 hover:text-black transition-colors">
                {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="tel:+19293508374"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            Free Consultation Call
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 overflow-hidden md:hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="text-2xl font-light text-gray-900" onClick={() => setIsOpen(false)}>
                    {link.name}
                </Link>
              ))}
              <a
                href="tel:+19293508374"
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-full text-base font-medium mt-4 w-full"
              >
                <Phone className="w-5 h-5" />
                Free Consultation Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
