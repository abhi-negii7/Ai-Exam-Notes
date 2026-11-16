
import { motion } from "motion/react";

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      className="group relative min-h-[190px] cursor-pointer overflow-hidden rounded-2xl border border-violet-100 bg-white p-7 text-gray-900 shadow-lg shadow-violet-100/50 transition-colors duration-300 hover:border-violet-300 hover:bg-violet-50"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { duration: 0.25 },
      }}
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-200/40 blur-3xl transition-opacity group-hover:bg-violet-300/50" />

      {/* Card Content */}
      <div className="relative z-10">
        <div className="mb-5 text-3xl">{icon}</div>

        <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>

        <p className="max-w-[250px] text-sm leading-6 text-gray-500">
          {description}
        </p>

        <div className="absolute -bottom-2 right-0 text-xl text-violet-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          ↗
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
