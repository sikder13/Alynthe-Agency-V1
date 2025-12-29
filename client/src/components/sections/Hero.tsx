import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#FAFAFA]">
      {/* Moving Mesh Gradient Background - Orbs (GPU Accelerated) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Orb 1: Indigo */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] md:w-[45vw] md:h-[45vw] bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [-50, 50, -20, -50],
            y: [-30, 30, -50, -30],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        {/* Orb 2: Purple - Hidden on mobile for performance */}
        <motion.div
          className="hidden md:block absolute top-[15%] right-[15%] w-[50vw] h-[50vw] bg-purple-400/30 rounded-full mix-blend-multiply filter blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [50, -50, 30, 50],
            y: [40, -40, 20, 40],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        {/* Orb 3: Blue - Static on mobile */}
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[55vw] h-[55vw] md:w-[55vw] md:h-[55vw] bg-blue-400/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [-30, 60, -40, -30],
            y: [30, -60, 40, 30],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Glassmorphism Layer & Overlay - Reduced opacity to allow colors to shine through */}
      <div className="absolute inset-0 z-0 backdrop-blur-[100px] bg-white/30" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.95] text-neutral-900 mb-8">
            The Infrastructure<br />
            of Growth.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl font-light text-neutral-500 tracking-wide">
            We automate chaos. We scale revenue.
          </p>
        </motion.div>
      </div>

      {/* Edge Fade Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
