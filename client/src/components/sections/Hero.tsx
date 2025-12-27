import { motion, Variants } from "framer-motion";
import auroraBg from "@assets/generated_images/subtle_aurora_gradient_background_for_minimalist_website.png";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth reveal
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Aurora */}
      <div className="absolute inset-0 z-0">
        <img 
          src={auroraBg} 
          alt="Aurora Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] text-primary mb-8">
          <motion.span className="block" variants={itemVariants}>The Infrastructure</motion.span>
          <motion.span className="block" variants={itemVariants}>of Growth.</motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-secondary font-light max-w-2xl mx-auto"
          variants={itemVariants}
        >
          We automate chaos. We scale revenue.
        </motion.p>
      </motion.div>
    </section>
  );
}
