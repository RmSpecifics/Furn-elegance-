import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BRAND } from "../config";
import { useCart } from "../cart";

const LINKS = [
  ["Our story", "#story"],
  ["Collections", "#collections"],
  ["Shop", "#shop"],
  ["Craft", "#craft"],
  ["Custom", "#custom"],
  ["Visit", "#contact"],
];

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-walnut/95 py-2 shadow-lg backdrop-blur" : "bg-transparent py-5"
      }`}
    >
      <div className="flex w-full items-center justify-between px-5 lg:px-8">
        <a href="#top" className={`flex items-baseline gap-2 font-serif text-2xl font-semibold ${scrolled ? "text-cream" : "text-walnut"}`}>
          {BRAND.name}
          <span className="hidden text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-oak sm:inline">Est. {BRAND.founded}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className={`text-sm font-medium transition hover:text-oak ${scrolled ? "text-cream" : "text-walnut"}`}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className={`relative rounded-full p-2 transition hover:bg-oak/20 ${scrolled ? "text-cream" : "text-walnut"}`}
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-oak text-[11px] font-bold text-walnut">
                {count}
              </span>
            )}
          </button>
          <button
            className={`md:hidden ${scrolled ? "text-cream" : "text-walnut"}`}
            onClick={() => setMenu((m) => !m)}
            aria-label="Toggle menu"
          >
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="mt-2 flex flex-col gap-1 bg-walnut px-5 pb-4 pt-2 md:hidden">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setMenu(false)} className="py-2 text-cream">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
