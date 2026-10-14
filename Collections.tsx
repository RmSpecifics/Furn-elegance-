import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IMG } from "../data/images";

const ITEMS = [
  { img: IMG.leather, pos: "50% 50%", tag: "Sofas", title: "Leather & curves", text: "Full-grain leather on soft, sweeping lines that settle into a room." },
  { img: IMG.swivel, pos: "66% 50%", tag: "Lounge chairs", title: "The Cocoon swivel", text: "Bouclé, chenille and velvet in sculpted, deep-seated forms." },
  { img: IMG.stool, pos: "50% 45%", tag: "Kitchen & bar", title: "Walnut & bouclé", text: "Solid timber frames with brass details and cloud-soft seats." },
  { img: IMG.studio, pos: "22% 55%", tag: "Study", title: "Quiet workspaces", text: "Warm timber shelving and task chairs in considered colour." },
  { img: IMG.showroom, pos: "30% 60%", tag: "Living", title: "Modular lounges", text: "Deep modular sofas and ottoman, upholstered to order." },
];

const CARD = 380;
const GAP = 20;

export default function Collections() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!wrap.current || !track.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - wrap.current.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const slide = (dir: number) => {
    const target = Math.max(-limit, Math.min(0, x.get() - dir * (CARD + GAP)));
    animate(x, target, { type: "spring", stiffness: 160, damping: 26 });
  };

  return (
    <section id="collections" className="bg-walnut py-24 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="h2 !text-cream">Slide through the studio</h2>
          </div>
          <div className="flex items-center gap-5">
            <p className="max-w-[16rem] text-sm text-cream/60">Each piece is made to order. Drag, or use the arrows, to see what we build.</p>
            <div className="flex gap-2">
              <button onClick={() => slide(-1)} aria-label="Scroll collections left" className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 transition hover:bg-cream hover:text-walnut"><ArrowLeft size={18} /></button>
              <button onClick={() => slide(1)} aria-label="Scroll collections right" className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 transition hover:bg-cream hover:text-walnut"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      <div ref={wrap} className="mt-12 overflow-hidden pl-5 md:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
        <motion.div
          ref={track}
          drag="x"
          style={{ x, gap: GAP }}
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
          data-cursor="drag"
          className="flex w-max select-none pr-5"
        >
          {ITEMS.map((c) => (
            <article key={c.title} className="group relative h-[500px] w-[78vw] max-w-[380px] shrink-0 overflow-hidden rounded-3xl sm:w-[380px]">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                style={{ objectPosition: c.pos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/95 via-walnut/60 via-45% to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-oak">{c.tag}</p>
                <h3 className="mt-2 font-serif text-3xl !text-cream">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{c.text}</p>
                <a href="#shop" className="mt-4 inline-flex items-center gap-2 text-sm text-cream underline-offset-4 hover:text-oak hover:underline" data-cursor="link">
                  Shop this range <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
