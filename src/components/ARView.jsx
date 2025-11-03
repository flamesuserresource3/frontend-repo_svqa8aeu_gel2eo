import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function ARView() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream;
    const init = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (e) {
        setError("Camera access denied or unavailable.");
      }
    };
    init();
    return () => {
      stream?.getTracks()?.forEach(t => t.stop());
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="relative h-[55vh] w-full overflow-hidden rounded-3xl border border-slate-800">
        <video ref={videoRef} playsInline muted className="absolute inset-0 h-full w-full object-cover" />
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950">
            <Camera className="h-10 w-10 text-cyan-400" />
            <p className="mt-2 text-slate-400">Initializing camera…</p>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-10 rounded-3xl ring-2 ring-cyan-400/50" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-fuchsia-500/60"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-xl font-semibold">AR Projection (Prototype)</h3>
        <p className="text-slate-300">
          Preview how your model would appear in the real world. Align the target and tap to place.
        </p>
        <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
          <li>Move your device to scan the environment.</li>
          <li>Use two fingers to rotate and scale the object.</li>
          <li>Lighting adapts to ambient brightness.</li>
        </ul>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-slate-400 text-sm">
            Full AR support is device and browser dependent. This demo simulates the experience with your camera feed and animated guides.
          </p>
        </div>
      </div>
    </div>
  );
}
