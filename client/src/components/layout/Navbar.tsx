import { Link, useLocation } from "wouter";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        <Link href="/">
          <a 
            className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => handleScrollTop(e, "/")}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 border-[1.5px] border-black bg-white">
              <path d="M20 0V40" stroke="black" strokeWidth="1.5"/>
              <path d="M0 20H40" stroke="black" strokeWidth="1.5"/>
              <path d="M0 0L40 40" stroke="black" strokeWidth="1.5"/>
              <path d="M40 0L0 40" stroke="black" strokeWidth="1.5"/>
            </svg>
            <span className="font-light tracking-tight text-xl text-black">ALYNTHE</span>
          </a>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              <a 
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors"
                onClick={(e) => handleScrollTop(e, link.href)}
              >
                {link.name}
              </a>
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
                <Link key={link.name} href={link.href}>
                  <a
                    className="text-2xl font-light text-gray-900"
                    onClick={(e) => {
                      handleScrollTop(e, link.href);
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
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
