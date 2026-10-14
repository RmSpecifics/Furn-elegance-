import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, ENV } from "../config";
import { submitForm } from "../forms";

export default function Footer() {
  const [done, setDone] = useState(false);

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("Email") || "");
    try {
      await submitForm("Newsletter signup", { Email: email });
      setDone(true);
    } catch {
      setDone(false);
    }
  }

  return (
    <footer id="contact" className="grain bg-walnut text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-semibold !text-cream">{BRAND.name}</h3>
          <p className="mt-3 max-w-xs text-sm text-cream/70">{BRAND.sub}</p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-cream/10 p-2 hover:bg-oak hover:text-walnut"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-cream/10 p-2 hover:bg-oak hover:text-walnut"><Instagram size={18} /></a>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="font-serif text-lg">Contact</h4>
          <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-oak" />{BRAND.address}</p>
          <p className="flex items-center gap-3"><Phone size={16} className="text-oak" />{BRAND.phone}</p>
          <p className="flex items-center gap-3"><Mail size={16} className="text-oak" />{BRAND.email}</p>
          <p className="text-cream/70">{BRAND.hours}</p>
        </div>

        <div>
          <h4 className="font-serif text-lg">New pieces, first</h4>
          <p className="mt-2 text-sm text-cream/70">Join the list for new arrivals and workshop offers.</p>
          {done ? (
            <p className="mt-4 text-sm text-oak">Thanks. You are on the list.</p>
          ) : (
            <form onSubmit={subscribe} className="mt-4 flex gap-2">
              <input required type="email" name="Email" placeholder="Your email" className="input !border-transparent text-charcoal" />
              <button className="btn bg-oak text-walnut hover:bg-cream">Join</button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>

      <a
        href={`https://wa.me/${ENV.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
    </footer>
  );
}
