import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const services = [
  {
    id: 0,
    title: "01 Experience Design",
    description: "We craft user-centric interfaces that convert. Beyond aesthetics, we design for behavior, ensuring every interaction drives the user towards a meaningful goal.",
    details: [
      "User Interface (UI) Design",
      "User Experience (UX) Strategy",
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

function ServiceCard({ service, setActive }: { service: typeof services[0], setActive: (id: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px", amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActive(service.id);
    }
  }, [isInView, service.id, setActive]);

  return (
    <motion.div
      ref={ref}
      className="min-h-[80vh] flex items-center justify-center p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 w-full max-w-xl">
        <h3 className="text-2xl font-light text-gray-900 mb-6 md:hidden">{service.title}</h3>
        <ul className="space-y-4">
          {service.details.map((detail, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-600 font-light text-lg">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              {detail}
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-8 border-t border-gray-100">
           <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 font-light italic">
              Visual asset for {service.title}
           </div>
        </div>
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
            <div className="relative h-64"> 
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: activeId === service.id ? 1 : 0,
                    x: activeId === service.id ? 0 : -20,
                    pointerEvents: activeId === service.id ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-5xl font-light text-gray-900 mb-8 tracking-tight">
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
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} setActive={setActiveId} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
