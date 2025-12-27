import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

function Counter({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(from, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, to, spring]);

  useEffect(() => {
    return display.on("change", (v) => setValue(Number(v.replace(/,/g, ""))));
  }, [display]);

  return <span ref={ref}>{display.get()}{suffix}</span>;
}

export function Impact() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="text-blue-600 font-medium tracking-wide text-sm mb-6 uppercase">Impact</span>
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-8">
              Numbers that speak for themselves
            </h2>
            <p className="text-xl text-gray-500 font-light mb-12 max-w-lg">
              We measure what matters. Our infrastructure directly correlates to revenue, efficiency, and scalability.
            </p>
            <div>
              <Link href="/about">
                <a className="group inline-flex items-center gap-3 px-8 py-4 border border-gray-900 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <span className="font-medium">Our Philosophy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            <div className="bg-white p-12 flex flex-col gap-2 aspect-square justify-center hover:bg-blue-50/30 transition-colors">
              <span className="text-gray-500 text-sm font-medium">Projects completed</span>
              <span className="text-5xl md:text-6xl font-light text-gray-900">
                <Counter from={0} to={180} suffix="+" />
              </span>
            </div>
            <div className="bg-white p-12 flex flex-col gap-2 aspect-square justify-center hover:bg-blue-50/30 transition-colors">
              <span className="text-gray-500 text-sm font-medium">Average client ROI</span>
              <span className="text-5xl md:text-6xl font-light text-gray-900 text-blue-600">
                <Counter from={0} to={340} suffix="%" />
              </span>
            </div>
            <div className="bg-white p-12 flex flex-col gap-2 aspect-square justify-center hover:bg-blue-50/30 transition-colors">
              <span className="text-gray-500 text-sm font-medium">Client retention rate</span>
              <span className="text-5xl md:text-6xl font-light text-gray-900">
                <Counter from={0} to={92} suffix="%" />
              </span>
            </div>
            <div className="bg-white p-12 flex flex-col gap-2 aspect-square justify-center hover:bg-blue-50/30 transition-colors">
              <span className="text-gray-500 text-sm font-medium">Annual Hours Saved</span>
              <span className="text-5xl md:text-6xl font-light text-gray-900">
                <Counter from={0} to={12000} suffix="+" />
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
