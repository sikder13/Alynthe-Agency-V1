import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-24 bg-background border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col justify-between h-full">
            <div className="mb-8">
              <span className="text-lg font-medium tracking-tight">ALYNTHE</span>
            </div>
            <p className="text-sm text-secondary/60">
              © 2026 Alynthe LLC.<br />All rights reserved.
            </p>
          </div>

          {/* Column 2: Studio */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-primary">Indianapolis</h4>
            <p className="text-sm text-secondary leading-relaxed">
              1438 Spann Ave,<br />
              Indianapolis, IN 46203,<br />
              USA
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-primary">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:alyntheinfo@gmail.com" className="text-sm text-secondary hover:text-accent transition-colors">
                alyntheinfo@gmail.com
              </a>
              <a href="tel:+19293508374" className="text-sm text-secondary hover:text-accent transition-colors">
                +1 929 350 8374
              </a>
            </div>
          </div>

          {/* Column 4: Sitemap */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-primary">Sitemap</h4>
            <div className="flex flex-col gap-2">
              {["Services", "Work", "Methodology"].map((link) => (
                <a key={link} href="#" className="text-sm text-secondary hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
