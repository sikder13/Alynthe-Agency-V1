import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const pillars = [
  { id: "01", title: "Experience Design", desc: "User-centric interfaces that convert.", hash: "design" },
  { id: "02", title: "Growth Engines", desc: "Automated marketing & sales pipelines.", hash: "growth" },
  { id: "03", title: "Intelligent Systems", desc: "AI-driven operational workflows.", hash: "systems" }
];

export function ServicePillars() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col">
          {pillars.map((pillar, index) => (
            <Link key={pillar.id} href={`/services#${pillar.hash}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group border-t border-gray-200 py-16 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 active:scale-[0.98] active:bg-indigo-50/50 transition-all duration-150 px-4"
              >
                <div className="flex items-baseline gap-8 md:gap-16">
                  <span className="text-sm font-medium text-gray-400">{pillar.id}</span>
                  <h3 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {pillar.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gray-500 font-light hidden md:block">{pillar.desc}</span>
                  <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white group-hover:bg-black group-hover:border-black transition-colors">
                    <ArrowRight className="w-5 h-5 text-black group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}
