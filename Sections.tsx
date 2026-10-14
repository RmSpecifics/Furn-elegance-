import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Truck, ShieldCheck, Hammer, Leaf } from "lucide-react";
import { BRAND, REVIEWS, rand } from "../config";

export function DeliveryStrip() {
  const items = [
    [Truck, `Free delivery over ${rand(BRAND.freeDeliveryOver)}`],
    [ShieldCheck, "Secure card & instant EFT payment"],
    [Hammer, `Made in our workshop since ${BRAND.founded}`],
    [Leaf, "Responsibly sourced materials"],
  ] as const;
  return (
    <div className="bg-walnut text-cream">
      <div className="mx-auto grid max-w-6xl gap-4 px-5 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, text]) => (
          <div key={text} className="flex items-center gap-3">
            <Icon size={20} className="shrink-0 text-oak" />
            <span className="text-cream/90">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hidden until you add real reviews in src/config.ts */
export function Testimonials() {
  const [i, setI] = useState(0);
  if (REVIEWS.length === 0) return null;
  return (
    <section className="bg-sand/60 py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="eyebrow">What customers say</p>
        <motion.blockquote key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl leading-snug text-walnut md:text-4xl">
          “{REVIEWS[i].text}”
        </motion.blockquote>
        <p className="mt-4 text-sm text-charcoal/60">{REVIEWS[i].name}</p>
        <div className="mt-6 flex justify-center gap-2">
          {REVIEWS.map((_, n) => (
            <button key={n} onClick={() => setI(n)} aria-label={`Show review ${n + 1}`} className={`h-2.5 rounded-full transition-all ${n === i ? "w-8 bg-walnut" : "w-2.5 bg-walnut/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ["Do you deliver across South Africa?", "Yes. We deliver nationwide. Orders over " + rand(BRAND.freeDeliveryOver) + " qualify for free delivery to main centres. Collection from the workshop is also available."],
  ["How long does a piece take to make?", "Every piece is made to order. Most are ready within a few weeks depending on size, fabric and finish, and we confirm a date when you order."],
  ["Can I pay a deposit?", "Yes. At checkout choose the 50% deposit option and pay the balance before delivery."],
  ["Can you build something that isn't listed?", "Absolutely. Send us the custom order form with your sizes, fabric or wood and budget and we will quote you."],
  ["Can I choose my own fabric?", "Yes. Sofas and chairs can be upholstered in a range of fabrics and leathers. Tell us your preference when you order."],
  ["How do I care for my furniture?", "Wipe with a soft damp cloth, vacuum upholstery gently and re-oil solid timber once or twice a year. Care instructions come with every order."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section max-w-3xl">
      <p className="eyebrow">FAQ</p>
      <h2 className="h2">Questions, answered</h2>
      <div className="mt-10 divide-y divide-walnut/15 border-y border-walnut/15">
        {FAQS.map(([q, a], n) => (
          <div key={q}>
            <button onClick={() => setOpen(open === n ? null : n)} className="flex w-full items-center justify-between gap-4 py-6 text-left font-medium text-walnut" aria-expanded={open === n}>
              {q}
              <ChevronDown className={`shrink-0 transition ${open === n ? "rotate-180" : ""}`} size={20} />
            </button>
            {open === n && <p className="pb-6 leading-relaxed text-charcoal/75">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
