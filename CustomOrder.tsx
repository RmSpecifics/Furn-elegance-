import { useState, type FormEvent } from "react";
import { submitForm } from "../forms";

const TYPES = ["Sofa or lounge", "Chair or stool", "Dining table", "Bed", "Wardrobe", "Shelving / bookcase", "Desk", "Other"];
const WOODS = ["Oak", "Walnut", "Pine", "Meranti", "Reclaimed timber", "Not sure yet"];

export default function CustomOrder() {
  const [state, setState] = useState<"idle" | "sending" | "email" | "whatsapp" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") data[k] = v;
    });
    setState("sending");
    try {
      setState(await submitForm("New custom order request", data));
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="custom" className="bg-sand/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="eyebrow">Custom orders</p>
          <h2 className="h2">Something specific in mind?</h2>
          <p className="mt-4 text-charcoal/80">
            Tell us what you need and the space it has to fit. We will come back with a quote and a timeline, and you can pay a
            50% deposit online to start the build.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm md:col-span-3 md:grid-cols-2">
          <input required name="Name" placeholder="Full name" className="input" autoComplete="name" />
          <input required name="Phone" placeholder="Phone / WhatsApp" className="input" autoComplete="tel" />
          <input required type="email" name="Email" placeholder="Email" className="input md:col-span-2" autoComplete="email" />
          <select name="Furniture type" className="input" defaultValue={TYPES[0]}>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select name="Wood type" className="input" defaultValue={WOODS[0]}>
            {WOODS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input name="Dimensions" placeholder="Dimensions (L × W × H, mm)" className="input" />
          <input name="Budget" placeholder="Budget (R)" className="input" inputMode="numeric" />
          <textarea name="Notes" rows={4} placeholder="Tell us more: style, colour, anything we should know" className="input md:col-span-2" />
          <div className="md:col-span-2">
            <button disabled={state === "sending"} className="btn btn-primary w-full disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Request a quote"}
            </button>
            <p role="status" className="mt-3 text-sm">
              {state === "email" && <span className="text-green-700">Thank you. We have your request and will be in touch soon.</span>}
              {state === "whatsapp" && <span className="text-green-700">WhatsApp opened with your details. Press send to finish.</span>}
              {state === "error" && <span className="text-red-700">Something went wrong. Please try again or WhatsApp us.</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
