import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    id: "01",
    title: "Experience Design",
    details: "Web Design, UI/UX, Video Editing, Content Writing.",
  },
  {
    id: "02",
    title: "Growth Engines",
    details: "SEO, Google Ads, Social Media Management, Profile Building.",
  },
  {
    id: "03",
    title: "Intelligent Systems",
    details: "Custom AI Solutions, Micro-services, Automation Workflows.",
  },
];

export function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-secondary">Capabilities</span>
        </motion.div>

        <div className="flex flex-col border-t border-black/10">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative border-b border-black/10 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={cn(
                  "py-12 md:py-16 transition-all duration-500 ease-out",
                  hoveredIndex === index ? "pb-24" : ""
                )}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <h3 className="text-3xl md:text-5xl font-light tracking-tight group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="hidden md:block text-sm font-medium text-secondary/50">
                    {item.id}
                  </span>
                </div>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1]",
                    hoveredIndex === index ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                  )}
                >
                  <p className="text-lg md:text-xl text-secondary font-light">
                    {item.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
