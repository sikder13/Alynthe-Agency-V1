import { motion } from "framer-motion";

interface AnimatedGradientProps {
  variant?: "purple" | "teal" | "gold";
  className?: string;
}

export function AnimatedGradient({ variant = "purple", className = "" }: AnimatedGradientProps) {
  const colorMap = {
    purple: {
      blob1: "bg-purple-600/60",
      blob2: "bg-indigo-500/50",
      blob3: "bg-blue-900/70",
      base: "bg-slate-900"
    },
    teal: {
      blob1: "bg-cyan-500/50",
      blob2: "bg-emerald-600/60",
      blob3: "bg-slate-800/70",
      base: "bg-slate-900"
    },
    gold: {
      blob1: "bg-emerald-500/50",
      blob2: "bg-yellow-500/60",
      blob3: "bg-amber-600/70",
      base: "bg-slate-900"
    }
  };
  
  const colors = colorMap[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden ${colors.base} ${className}`}>
      <motion.div
        className={`absolute w-[80%] h-[80%] ${colors.blob1} rounded-full mix-blend-screen filter blur-[60px]`}
        animate={{
          x: ["0%", "30%", "-10%", "0%"],
          y: ["0%", "-20%", "30%", "0%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ top: "-20%", left: "-20%" }}
      />
      
      <motion.div
        className={`absolute w-[70%] h-[70%] ${colors.blob2} rounded-full mix-blend-screen filter blur-[50px]`}
        animate={{
          x: ["-20%", "20%", "-30%", "-20%"],
          y: ["20%", "-10%", "20%", "20%"],
          scale: [1.1, 0.9, 1.2, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ bottom: "-10%", right: "-10%" }}
      />
      
      <motion.div
        className={`absolute w-[60%] h-[60%] ${colors.blob3} rounded-full mix-blend-screen filter blur-[40px]`}
        animate={{
          x: ["10%", "-20%", "30%", "10%"],
          y: ["-10%", "20%", "-20%", "-10%"],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ top: "30%", left: "20%" }}
      />

      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
