import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brush, Hammer, PencilRuler, TreePine } from "lucide-react";
import { IMG } from "../data/images";

const STEPS = [
  { icon: PencilRuler, title: "Design", text: "We agree sizes, fabric, timber and finish with you before anything is cut." },
  { icon: TreePine, title: "Select & cut", text: "Timber and hides are chosen by hand and cut to exact measure." },
  { icon: Hammer, title: "Build", text: "Frames are joined, glued and clamped. Upholstery is cut, sewn and fitted in-house." },
  { icon: Brush, title: "Finish", text: "Hand-finished, inspected piece by piece, then delivered to your door." },
];

export default function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="craft" className="section">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow">The craft</p>
        <h2 className="h2">Not mass-produced.<br /><em className="text-oak">Made, stitch by stitch.</em></h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div ref={ref} className="relative min-h-[360px] overflow-hidden rounded-3xl bg-walnut lg:min-h-[520px]">
          <motion.img
            src={IMG.craft}
            alt="A craftsman hand-lacing leather along the edge of a chair"
            loading="lazy"
            draggable={false}
            style={{ y, scale: 1.2 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-6 max-w-xs font-serif text-2xl italic text-cream">Hand-laced leather, finished one stitch at a time.</p>
        </div>

        <ol className="flex flex-col justify-center gap-7">
          {STEPS.map((s, k) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: k * 0.08, duration: 0.6 }}
              className="flex gap-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-oak/50 text-oak"><s.icon size={20} /></span>
              <div>
                <h3 className="font-sans text-base font-semibold">{`0${k + 1}  ${s.title}`}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/70">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
