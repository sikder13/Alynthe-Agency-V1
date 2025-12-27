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
              <Link href="/">
                <a className="flex items-center gap-3 mb-8 cursor-pointer group hover:opacity-80 transition-opacity">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 border-[1.5px] border-black bg-white">
                      <path d="M20 0V40" stroke="black" strokeWidth="1.5"/>
                      <path d="M0 20H40" stroke="black" strokeWidth="1.5"/>
                      <path d="M0 0L40 40" stroke="black" strokeWidth="1.5"/>
                      <path d="M40 0L0 40" stroke="black" strokeWidth="1.5"/>
                  </svg>
                  <span className="font-light tracking-tight text-lg text-black">ALYNTHE</span>
                </a>
              </Link>
            </div>
            <p className="text-sm text-gray-400 font-light">
              © 2026 Alynthe LLC. All rights reserved.
            </p>
          </div>

          {/* Address Column */}
          <div className="md:col-span-3 md:col-start-6 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-gray-900">Office Address:</h4>
            <p className="text-base text-gray-500 font-light leading-relaxed">
              1438 Spann Ave,<br />
              Indianapolis, IN 46203,<br />
              USA
            </p>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-2 md:col-start-9 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-gray-900">Contact Phone:</h4>
              <a href="tel:+19293508374" className="text-base text-gray-500 hover:text-black transition-colors font-light">
                +1 929 350 8374
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-gray-900">Contact Email:</h4>
              <a href="mailto:alyntheinfo@gmail.com" className="text-base text-gray-500 hover:text-black transition-colors font-light">
                alyntheinfo@gmail.com
              </a>
            </div>
            <div className="flex gap-3 mt-2">
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Facebook className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Instagram className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Linkedin className="w-4 h-4" />
               </a>
               <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                 <Twitter className="w-4 h-4" />
               </a>
            </div>
          </div>

          {/* Sitemap Column */}
          <div className="md:col-span-2 md:col-start-12 flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Sitemap</h4>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a className="text-base text-gray-500 hover:text-black transition-colors font-light">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
