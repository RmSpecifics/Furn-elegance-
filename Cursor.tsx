import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "default" | "link" | "drag";

/** Soft following cursor. Grows over links and shows "Drag" over sliders. Disabled on touch devices. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest("input,textarea,select")) setVisible(false);
      const tagged = t?.closest("[data-cursor]") as HTMLElement | null;
      if (tagged?.dataset.cursor === "drag") setMode("drag");
      else if (tagged || t?.closest("a,button,label,summary")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "drag" ? 84 : mode === "link" ? 54 : 30;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border border-oak"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: mode === "drag" ? "rgba(36,27,21,0.88)" : mode === "link" ? "rgba(182,138,86,0.18)" : "rgba(182,138,86,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {mode === "drag" && <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-cream">Drag</span>}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-oak"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible && mode !== "drag" ? 1 : 0 }}
      />
    </>
  );
}
