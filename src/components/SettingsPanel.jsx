import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPanel() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [accent, setAccent] = useState("cyan");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h3 className="text-white font-semibold">Appearance</h3>
        <div className="mt-4 space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-slate-300">Reduce motion</span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>
          <div>
            <p className="text-slate-300">Accent color</p>
            <div className="mt-2 flex items-center gap-2">
              {[
                { key: "cyan", class: "bg-cyan-500" },
                { key: "violet", class: "bg-violet-500" },
                { key: "blue", class: "bg-blue-500" },
                { key: "fuchsia", class: "bg-fuchsia-500" },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setAccent(c.key)}
                  className={`h-7 w-7 rounded-full ring-2 ${c.class} ${accent === c.key ? "ring-white" : "ring-transparent"}`}
                  aria-label={c.key}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-white font-semibold">About</h3>
        <p className="mt-2 text-slate-400 text-sm">
          3D Explorer is a futuristic prototype focused on smooth motion and interactive 3D scenes with an immersive dark UI.
        </p>
        <div className="mt-4">
          <div className="h-36 w-full overflow-hidden rounded-xl border border-slate-800">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.12),transparent_35%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-14 w-14 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(34,211,238,0.7), rgba(99,102,241,0.7), rgba(168,85,247,0.7), rgba(34,211,238,0.7))",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
