import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { UploadCloud } from "lucide-react";

const demoModels = [
  {
    id: "astronaut",
    name: "Astronaut & Ribbon",
    accent: "from-cyan-500/20 to-blue-500/20",
    scene: "https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode",
  },
  {
    id: "browser",
    name: "Neon Browser",
    accent: "from-fuchsia-500/20 to-violet-500/20",
    scene: "https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode",
  },
  {
    id: "surreal",
    name: "Surreal Grid",
    accent: "from-teal-500/20 to-cyan-500/20",
    scene: "https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode",
  },
];

export default function ModelsGallery() {
  const [activeId, setActiveId] = useState(demoModels[0].id);
  const [loaded, setLoaded] = useState(false);
  const [uploaded, setUploaded] = useState(null);

  const active = demoModels.find((m) => m.id === activeId);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {demoModels.map((m) => (
            <motion.button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-colors`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
              <div className="relative z-10">
                <h3 className="text-white font-semibold">{m.name}</h3>
                <p className="text-slate-400 text-sm mt-1">Tap to preview with smooth transitions</p>
              </div>
              {activeId === m.id && (
                <motion.div
                  layoutId="model-card"
                  className="absolute inset-0 ring-1 ring-cyan-400/50 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />)
              }
            </motion.button>
          ))}
        </div>

        <label className="block cursor-pointer">
          <input
            type="file"
            accept=".gltf,.glb,.obj"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploaded(file.name);
            }}
          />
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 hover:bg-slate-900 transition-colors">
            <UploadCloud className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="text-white font-medium">Import model (GLTF / OBJ)</p>
              <p className="text-slate-400 text-sm">Optimized pipeline coming soon in this prototype</p>
            </div>
          </div>
        </label>
        {uploaded && (
          <p className="text-sm text-slate-400">Queued: {uploaded}</p>
        )}
      </div>

      <div className="relative h-[55vh] w-full overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <AnimatePresence>{!loaded && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-12 w-12 rounded-full border-2 border-violet-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}</AnimatePresence>
        <Spline
          scene={active.scene}
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="bg-slate-900/60 rounded-md px-2 py-1">Tip: Drag to rotate · Pinch/Scroll to zoom</span>
          <span className="bg-slate-900/60 rounded-md px-2 py-1">Interactive preview</span>
        </div>
      </div>
    </div>
  );
}
