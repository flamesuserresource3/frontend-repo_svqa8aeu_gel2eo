import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSpline from "./components/HeroSpline";
import ModelsGallery from "./components/ModelsGallery";
import ARView from "./components/ARView";
import SettingsPanel from "./components/SettingsPanel";
import { Rocket } from "lucide-react";

export default function App() {
  const [active, setActive] = useState("home");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl bg-cyan-500/10" />
        <div className="absolute top-20 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl bg-fuchsia-500/10" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl bg-blue-500/10" />
      </div>

      <header className="relative mx-auto max-w-6xl px-4 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/30 blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500">
                <Rocket className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">3D Explorer</h1>
              <p className="text-xs text-slate-400">Futuristic 3D viewer prototype</p>
            </div>
          </div>
          <div className="hidden md:block text-slate-400 text-sm">Smooth motion • Neon accents • Dark UI</div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-28 pt-6 space-y-8">
        {active === "home" && <HeroSpline />}
        {active === "models" && (
          <section className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold"
            >
              Models
            </motion.h2>
            <ModelsGallery />
          </section>
        )}
        {active === "ar" && (
          <section className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold"
            >
              AR View
            </motion.h2>
            <ARView />
          </section>
        )}
        {active === "settings" && (
          <section className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold"
            >
              Settings
            </motion.h2>
            <SettingsPanel />
          </section>
        )}
      </main>

      <Navbar active={active} onChange={setActive} />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
          >
            <motion.div
              className="relative h-28 w-28"
              initial={{ scale: 0.8 }}
              animate={{ rotate: 360, scale: [0.8, 1.05, 1] }}
              transition={{ rotate: { duration: 2, ease: "easeInOut" }, scale: { duration: 0.8 } }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-500" />
              <div className="absolute inset-[6px] rounded-2xl bg-slate-950" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-16 text-slate-400"
            >
              Loading 3D Explorer…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
