import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    id: 0,
    title: "01 Experience Design",
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
    title: "02 Growth Engines",
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
    title: "03 Intelligent Systems",
    description: "Future-proof your operations with custom AI agents and robust backend logic. We build the hidden machinery that powers your business efficiency.",
    details: [
      "Custom AI Agents",
      "Backend Architecture",
      "API Development",
      "Process Automation"
    ]
  }
];

// --- Visual Assets ---

function VisualCard({ id }: { id: number }) {
  if (id === 0) {
    // Card 1: Mini Browser Window
    return (
      <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm w-full aspect-[4/3] flex flex-col">
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="p-6 space-y-4 bg-neutral-50/30 flex-1 relative">
           <div className="h-40 bg-neutral-100 rounded w-full border border-neutral-200/50" />
           <div className="flex gap-4">
              <div className="h-16 bg-neutral-100 rounded w-1/3 border border-neutral-200/50" />
              <div className="h-16 bg-neutral-100 rounded w-1/3 border border-neutral-200/50" />
              <div className="h-16 bg-neutral-100 rounded w-1/3 border border-neutral-200/50" />
           </div>
           {/* Abstract floating elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-100/50 rounded-full blur-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (id === 1) {
    // Card 2: Process Node
    return (
      <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm w-full aspect-[4/3] flex items-center justify-center p-8 bg-neutral-50/30">
        <svg viewBox="0 0 400 200" className="w-full h-full">
           <defs>
             <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
               <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1" />
             </marker>
           </defs>
           {/* Nodes */}
           <circle cx="50" cy="100" r="30" fill="white" stroke="#3B82F6" strokeWidth="2" />
           <text x="50" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Lead</text>

           <circle cx="200" cy="100" r="30" fill="white" stroke="#8B5CF6" strokeWidth="2" />
           <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Nurture</text>

           <circle cx="350" cy="100" r="30" fill="white" stroke="#10B981" strokeWidth="2" />
           <text x="350" y="105" textAnchor="middle" fontSize="10" fill="#64748B" fontFamily="sans-serif">Close</text>

           {/* Lines */}
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
    // Card 3: Terminal
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

// --- Main Components ---

function ServiceCard({ service, setActive, index }: { service: typeof services[0], setActive: (id: number) => void, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px", amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActive(index);
    }
  }, [isInView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      className="min-h-[90vh] flex items-center justify-center p-6 md:p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 w-full max-w-xl flex flex-col gap-8">
        <h3 className="text-2xl font-light text-gray-900 md:hidden">{service.title}</h3>
        
        {/* Visual Asset */}
        <div className="w-full">
           <VisualCard id={service.id} />
        </div>

        {/* Details List */}
        <ul className="space-y-4">
          {service.details.map((detail, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-600 font-light text-base md:text-lg">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ServicesScroll() {
  const [activeId, setActiveId] = useState(0);

  return (
    <section className="bg-neutral-50 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column - Sticky */}
          <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 flex-col justify-center pr-20">
            <div className="relative h-64 w-full"> 
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeId === index ? 1 : 0,
                    y: activeId === index ? 0 : 20,
                    pointerEvents: activeId === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Scroll */}
          <div className="w-full lg:w-1/2 pb-24 pt-12 lg:pt-0">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                setActive={setActiveId} 
                index={index}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
