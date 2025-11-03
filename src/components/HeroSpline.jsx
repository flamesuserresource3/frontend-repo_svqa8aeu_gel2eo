import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSpline() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white"
        >
          3D Explorer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-slate-300 text-lg"
        >
          View and interact with futuristic 3D scenes. Rotate, zoom, and explore with smooth, cinematic motion.
        </motion.p>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px] shadow-cyan-500/70" />
          <span className="text-slate-400 text-sm">Interactive Spline scene loaded in real time</span>
        </div>
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="h-14 w-14 rounded-full border-2 border-cyan-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
