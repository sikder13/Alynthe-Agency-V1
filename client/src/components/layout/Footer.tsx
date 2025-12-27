import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between h-full min-h-[160px]">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 border-[1.5px] border-black relative flex items-center justify-center overflow-hidden bg-white">
                    <div className="absolute w-full h-[1.5px] bg-black" />
                    <div className="absolute h-full w-[1.5px] bg-black" />
                    <div className="absolute w-[141%] h-[1.5px] bg-black rotate-45" />
                    <div className="absolute w-[141%] h-[1.5px] bg-black -rotate-45" />
                </div>
                <span className="font-light tracking-tight text-lg text-black">ALYNTHE</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light">
              © 2026 Alynthe LLC.
            </p>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 md:col-start-6 flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Twitter className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Sitemap Column */}
          <div className="md:col-span-3 md:col-start-10 flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Sitemap</h4>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="text-base text-gray-500 hover:text-black transition-colors font-light">
                    {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
