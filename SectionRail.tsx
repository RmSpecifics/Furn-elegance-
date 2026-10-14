import { useEffect, useState } from "react";

const SECTIONS = [
  ["top", "Home"],
  ["story", "Our story"],
  ["collections", "Collections"],
  ["shop", "Shop"],
  ["craft", "Craft"],
  ["custom", "Custom"],
  ["contact", "Visit"],
] as const;

/** Right-hand dot rail so visitors can slide through the page one section at a time. */
export default function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id} className="group flex items-center gap-3">
          <span className="rounded-full bg-walnut px-3 py-1 text-[11px] tracking-wide text-cream opacity-0 transition group-hover:opacity-100">{label}</span>
          <span className={`block rounded-full transition-all duration-300 ${active === id ? "h-6 w-2 bg-oak" : "h-2 w-2 bg-walnut/30 group-hover:bg-walnut"}`} />
        </a>
      ))}
    </nav>
  );
}
