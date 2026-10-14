import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BRAND } from "../config";
import { IMG } from "../data/images";

const SLIDES = [
  {
    img: IMG.swivel,
    fit: "cover" as const,
    pos: "55% 50%",
    tag: "New season · Living",
    title: "The Cocoon collection",
    text: "Sculpted swivel chairs in bouclé, chenille and velvet. Deep, soft and shaped to be lived in, upholstered to order in the fabric you choose.",
    cta: "Shop living",
    href: "#shop",
  },
  {
    img: IMG.showroom,
    fit: "contain" as const,
    pos: "40% 55%",
    tag: "Lounge · Sofas",
    title: "Rooms you won't want to leave",
    text: "Generous modular sofas and matching ottomans, built on solid frames and finished by hand in our workshop.",
    cta: "See the collection",
    href: "#collections",
  },
  {
    img: IMG.studio,
    fit: "contain" as const,
    pos: "35% 55%",
    tag: "Workspace · Study",
    title: "Furniture for focused days",
    text: "Warm timber shelving and sculpted task chairs in soft, considered colour, made for studios and homes alike.",
    cta: "Shop study",
    href: "#shop",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const s = SLIDES[i];

  return (
    <section
      id="top"
      className={`relative px-4 pb-6 pt-20 lg:h-[100svh] lg:min-h-[680px] lg:px-6 ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="grid h-full gap-5 lg:grid-cols-[minmax(340px,34%)_1fr]">
        {/* Side description */}
        <div className="order-2 flex flex-col justify-between rounded-3xl bg-sand/60 p-7 lg:order-1 lg:p-10">
          <p className="eyebrow !mb-0">
            Est. {BRAND.founded} · {BRAND.descriptor}
          </p>

          <div className="my-10 min-h-[290px] lg:my-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-walnut/60">
                  <span className="font-serif text-lg normal-case tracking-normal text-oak">
                    0{i + 1} <span className="text-walnut/30">/ 0{n}</span>
                  </span>
                  {s.tag}
                </p>
                <h1 className="font-serif text-4xl leading-[1.05] md:text-5xl xl:text-6xl">{s.title}</h1>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-charcoal/75">{s.text}</p>
                <a href={s.href} className="btn btn-primary mt-7" data-cursor="link">
                  {s.cta} <ArrowRight size={16} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-5 flex gap-2">
              {SLIDES.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Go to slide ${k + 1}`}
                  className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-walnut/15"
                >
                  {k < i && <span className="absolute inset-0 bg-walnut" />}
                  {k === i && <span key={i} className="progress-fill absolute inset-0 bg-walnut" onAnimationEnd={() => go(1)} />}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-walnut/55">Drag the image or use ← → keys</p>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Previous slide" className="flex h-11 w-11 items-center justify-center rounded-full border border-walnut/25 transition hover:bg-walnut hover:text-cream">
                  <ArrowLeft size={18} />
                </button>
                <button onClick={() => go(1)} aria-label="Next slide" className="flex h-11 w-11 items-center justify-center rounded-full border border-walnut/25 transition hover:bg-walnut hover:text-cream">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow */}
        <motion.div
          className="relative order-1 h-[56svh] overflow-hidden rounded-3xl bg-walnut lg:order-2 lg:h-auto"
          data-cursor="drag"
          drag="x"
          dragSnapToOrigin
          dragElastic={0.15}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1);
            else if (info.offset.x > 70) go(-1);
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {s.fit === "contain" ? (
                <>
                  {/* Lower-resolution photo: shown at its natural sharpness over a soft, blurred copy of itself */}
                  <img src={s.img} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 h-full w-full scale-125 select-none object-cover blur-2xl brightness-90" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-14">
                    <motion.img
                      src={s.img}
                      alt={s.title}
                      draggable={false}
                      className="max-h-full max-w-full select-none rounded-2xl object-contain shadow-2xl"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 7.5, ease: "easeOut" }}
                    />
                  </div>
                </>
              ) : (
                <motion.img
                  src={s.img}
                  alt={s.title}
                  draggable={false}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                  style={{ objectPosition: s.pos }}
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 7.5, ease: "easeOut" }}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-5 text-cream">
            <span className="rounded-full bg-cream/15 px-4 py-2 text-xs tracking-wide backdrop-blur-md">{s.tag}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
