import { motion } from "framer-motion";

interface PatternOverlayProps {
  variant: "dataGrid" | "pulse";
  className?: string;
}

export function PatternOverlay({ variant, className = "" }: PatternOverlayProps) {
  if (variant === "dataGrid") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px -40px"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px -120px"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 50%)",
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 40%)",
          }}
          animate={{
            scale: [1, 0.6, 1],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  return null;
}
