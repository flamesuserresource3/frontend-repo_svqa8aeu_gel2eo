import { Home, Boxes, Camera, Settings } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { key: "home", label: "Home", Icon: Home },
  { key: "models", label: "Models", Icon: Boxes },
  { key: "ar", label: "AR View", Icon: Camera },
  { key: "settings", label: "Settings", Icon: Settings },
];

export default function Navbar({ active, onChange }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-blue-500/10 pointer-events-none" />
        <nav className="relative flex items-center gap-2 px-3 py-2">
          {tabs.map(({ key, label, Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-300 hover:text-white"
                }`}
                aria-label={label}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/30 to-blue-500/30"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
