import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND, HISTORY, yearsOfCraft } from "../config";
import { IMG } from "../data/images";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" className="section">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Photo with gentle parallax */}
        <div ref={ref} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-sand">
            <motion.img
              src={IMG.stool}
              alt="Walnut and bouclé counter stool, detail of the joinery"
              loading="lazy"
              draggable={false}
              style={{ y, scale: 1.18 }}
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 right-2 rounded-2xl bg-walnut px-6 py-5 text-cream shadow-xl sm:-right-6"
          >
            <p className="font-serif text-5xl leading-none text-oak">{yearsOfCraft()}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">years of craft</p>
          </motion.div>
        </div>

        {/* Side description + timeline */}
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="h2">
            Brought to life in {BRAND.founded}.<br />
            <em className="text-oak">Now brought online.</em>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-charcoal/75">
            {BRAND.name} began as a workshop with one belief: furniture should be made properly, by people who care how it turns out.
            After more than two decades of building for homes, we have opened our doors to the digital world, so the same
            craftsmanship can reach you wherever you live.
          </p>

          <ol className="relative mt-10 space-y-8 border-l border-walnut/15 pl-8">
            {HISTORY.map((h, k) => (
              <motion.li
                key={h.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: k * 0.08, duration: 0.6 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-oak bg-cream" />
                <p className="font-serif text-2xl text-oak">{h.year}</p>
                <h3 className="mt-1 font-sans text-base font-semibold">{h.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-charcoal/70">{h.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
