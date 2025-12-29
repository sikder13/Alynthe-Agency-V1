import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 0,
    hash: "design",
    title: "Experience Design",
    number: "01",
    description: "We craft user-centric interfaces that convert. Beyond aesthetics, we design for behavior, ensuring every interaction drives the user towards a meaningful goal.",
    details: [
      "Website Design & Development",
      "UI Design / UX Strategy",
      "Interactive Prototyping",
      "Design Systems"
    ]
  },
  {
    id: 1,
    hash: "growth",
    title: "Growth Engines",
    number: "02",
    description: "Automated pipelines that scale. We integrate CRM, marketing automation, and analytics to create a self-sustaining engine for revenue growth.",
    details: [
      "Marketing Automation",
      "CRM Integration",
      "Sales Funnel Optimization",
      "Analytics & Reporting"
    ]
  },
  {
    id: 2,
    hash: "systems",
    title: "Intelligent Systems",
    number: "03",
    description: "Future-proof your operations with custom AI agents and robust backend logic. We build the hidden machinery that powers your business efficiency.",
    details: [
      "Custom AI Agents",
      "Backend Architecture",
      "API Development",
      "Process Automation"
    ]
  }
];

function VisualCard({ id }: { id: number }) {
  if (id === 0) {
    return (
      <div className="border border-white/40 rounded-xl overflow-hidden bg-white/60 backdrop-blur-xl shadow-lg w-full aspect-[4/3] flex flex-col relative">
        <div className="h-28 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-20" />
        </div>
        <div className="p-6 flex-1 bg-white/40 relative">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-6 right-6 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-100 flex items-center gap-2"
          >
            <div className="bg-green-100 p-1 rounded-full">
              <ArrowUpRight className="w-3 h-3 text-green-600" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Conversion</div>
              <div className="text-sm font-bold text-gray-800">+40%</div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-8 left-6 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-100 flex items-center gap-2"
          >
            <div className="bg-blue-100 p-1 rounded-full">
              <Activity className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Engagement</div>
              <div className="text-sm font-bold text-gray-800">2m 45s</div>
            </div>
          </motion.div>
          <div className="mt-12 space-y-3">
            <div className="h-2 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-100 rounded w-full" />
            <div className="h-2 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 1) {
    return (
      <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm w-full aspect-[4/3] flex items-center justify-center p-8 bg-neutral-50/30">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1" />
            </marker>
          </defs>
          <circle cx="50" cy="100" r="30" fill="white" stroke="#3B82F6" strokeWidth="2" />
          <text x="50" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Lead</text>
          <circle cx="200" cy="100" r="30" fill="white" stroke="#8B5CF6" strokeWidth="2" />
          <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Nurture</text>
          <circle cx="350" cy="100" r="30" fill="white" stroke="#10B981" strokeWidth="2" />
          <text x="350" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Close</text>
          <motion.line 
            x1="80" y1="100" x2="170" y2="100" 
            stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.line 
            x1="230" y1="100" x2="320" y2="100" 
            stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
          />
        </svg>
      </div>
    );
  }

  if (id === 2) {
    return (
      <div className="rounded-lg overflow-hidden bg-neutral-900 shadow-lg w-full aspect-[4/3] font-mono text-xs md:text-sm p-6 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-neutral-800 flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
        </div>
        <div className="mt-8 space-y-2 text-green-400">
          <p className="flex gap-2">
            <span className="text-blue-400">~</span>
            <span>./init_sequence.sh</span>
          </p>
          <p className="text-neutral-500">Loading core modules...</p>
          <p className="text-green-300/80">[ OK ] Module [AI_AGENT] initialized</p>
          <p className="text-green-300/80">[ OK ] Database connection established</p>
          <p className="text-green-300/80">[ OK ] API Gateway ready</p>
          <p className="animate-pulse">_</p>
        </div>
      </div>
    );
  }
  return null;
}

function ServiceSection({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <section
      ref={ref}
      id={service.hash}
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="order-1"
          >
            <span className="text-sm font-medium text-indigo-600 tracking-widest uppercase mb-4 block">
              {service.number}
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-6 leading-tight">
              {service.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-lg">
              {service.description}
            </p>
            
            <ul className="space-y-4">
              {service.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-4 text-gray-600 font-light text-base md:text-lg"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div 
            className="order-2 md:sticky md:top-[100px] md:h-fit md:self-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VisualCard id={service.id} />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export function ServicesScroll() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="w-full">
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
