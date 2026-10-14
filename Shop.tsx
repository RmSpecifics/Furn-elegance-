import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { IMG } from "../data/images";
import { rand } from "../config";
import { useCart } from "../cart";

export default function Shop() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const { add } = useCart();
  const items = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <section id="shop" className="section">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Shop online</p>
          <h2 className="h2">Made to order, delivered to you</h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                cat === c ? "border-walnut bg-walnut text-cream" : "border-walnut/20 text-walnut hover:border-walnut"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ objectPosition: p.pos }}
                />
                {p.isNew && <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-walnut backdrop-blur">New</span>}
                <button
                  onClick={() => add(p)}
                  aria-label={`Add ${p.name} to cart`}
                  className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-walnut py-3 text-sm text-cream opacity-0 transition-all duration-300 hover:bg-oak hover:text-walnut focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
                >
                  <Plus size={16} /> Add to cart
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-oak">{p.category}</p>
                  <h3 className="mt-1 font-serif text-2xl">{p.name}</h3>
                  <p className="mt-1 max-w-[17rem] text-sm text-charcoal/65">{p.blurb}</p>
                </div>
                <p className="whitespace-nowrap pt-5 font-medium text-walnut">{rand(p.price)}</p>
              </div>
            </motion.article>
          ))}

          {cat === "All" && (
            <motion.a
              layout
              key="custom"
              href="#custom"
              data-cursor="link"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="group relative block aspect-[4/5] self-start overflow-hidden rounded-3xl bg-walnut"
            >
              <img src={IMG.craft} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-105" style={{ objectPosition: "60% 50%" }} />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-walnut/90 to-transparent p-7 text-cream">
                <p className="text-[11px] uppercase tracking-[0.25em] text-oak">Made to measure</p>
                <h3 className="mt-2 font-serif text-3xl !text-cream">Something specific in mind?</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm">Request a custom piece <ArrowRight size={14} /></span>
              </div>
            </motion.a>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
