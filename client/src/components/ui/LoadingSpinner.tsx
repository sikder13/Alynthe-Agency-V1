import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-4 h-4 bg-indigo-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <p className="text-sm text-gray-400 font-light tracking-wider">Loading...</p>
      </div>
    </div>
  );
}
