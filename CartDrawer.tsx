import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, Lock, CheckCircle2 } from "lucide-react";
import { BRAND, ENV, rand } from "../config";
import { useCart } from "../cart";
import { submitForm } from "../forms";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Paystack"));
    document.body.appendChild(s);
  });
}

type View = "cart" | "checkout" | "done";

export default function CartDrawer() {
  const { lines, total, open, setOpen, setQty, clear } = useCart();
  const [view, setView] = useState<View>("cart");
  const [mode, setMode] = useState<"full" | "deposit">("full");
  const [delivery, setDelivery] = useState<"collect" | "deliver">("deliver");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [paidRef, setPaidRef] = useState("");

  const amountDue = mode === "deposit" ? Math.ceil(total / 2) : total;
  const freeDelivery = total >= BRAND.freeDeliveryOver;

  function close() {
    setOpen(false);
    if (view === "done") setView("cart");
  }

  async function pay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "");
    const email = get("email");

    if (!ENV.paystackKey) {
      setError("Online payment is not switched on yet. Add your Paystack public key (see README) to enable it.");
      return;
    }
    setBusy(true);
    try {
      await loadPaystack();
      const ref = "ORD" + Date.now();
      const items = lines.map((l) => `${l.qty} x ${l.product.name}`).join(", ");
      const details = {
        Name: get("name"),
        Phone: get("phone"),
        Email: email,
        Address: delivery === "deliver" ? get("address") : "Collection from workshop",
        Delivery: delivery === "deliver" ? (freeDelivery ? "Free delivery" : "Delivery, quote by area") : "Collection",
        Items: items,
        "Order total": rand(total),
        "Paid now": rand(amountDue),
        "Payment type": mode === "deposit" ? "50% deposit (balance due before delivery)" : "Paid in full",
        Reference: ref,
      };
      const handler = window.PaystackPop!.setup({
        key: ENV.paystackKey,
        email,
        amount: amountDue * 100, // Paystack expects the smallest unit (cents)
        currency: "ZAR",
        ref,
        metadata: {
          custom_fields: Object.entries(details).map(([k, v]) => ({ display_name: k, variable_name: k.toLowerCase().replace(/\W+/g, "_"), value: v })),
        },
        callback: (resp: { reference: string }) => {
          setPaidRef(resp.reference);
          // Best-effort notification to the owner; payment itself is already recorded by Paystack.
          submitForm("New paid order " + ref, { ...details, "Paystack reference": resp.reference }).catch(() => undefined);
          clear();
          setView("done");
          setBusy(false);
        },
        onClose: () => setBusy(false),
      });
      handler.openIframe();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not start. Please try again.");
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-walnut/10 px-5 py-4">
              <h2 className="text-xl font-semibold">{view === "checkout" ? "Checkout" : view === "done" ? "Thank you" : "Your cart"}</h2>
              <button onClick={close} aria-label="Close cart"><X /></button>
            </div>

            {view === "done" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <CheckCircle2 size={56} className="text-green-700" />
                <h3 className="text-2xl font-semibold">Payment received</h3>
                <p className="text-charcoal/70">We will confirm your order shortly and contact you about the build and delivery. Your receipt reference is <strong>{paidRef}</strong>.</p>
                <button onClick={close} className="btn btn-primary mt-4">Keep browsing</button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-charcoal/70">Your cart is empty.</p>
                <a href="#shop" onClick={close} className="btn btn-primary">Browse the collection</a>
              </div>
            ) : view === "cart" ? (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto p-5">
                  {lines.map(({ product: p, qty }) => (
                    <li key={p.id} className="flex gap-4">
                      <img src={p.image} alt="" draggable={false} className="h-20 w-24 shrink-0 rounded-lg object-cover" style={{ objectPosition: p.pos }} />
                      <div className="flex-1">
                        <p className="font-medium text-walnut">{p.name}</p>
                        <p className="text-sm text-charcoal/60">{rand(p.price)}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease quantity" className="rounded-full border border-walnut/20 p-1"><Minus size={14} /></button>
                          <span className="w-5 text-center text-sm">{qty}</span>
                          <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase quantity" className="rounded-full border border-walnut/20 p-1"><Plus size={14} /></button>
                        </div>
                      </div>
                      <p className="font-semibold">{rand(p.price * qty)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-walnut/10 p-5">
                  <div className="flex justify-between text-lg font-semibold text-walnut"><span>Total</span><span>{rand(total)}</span></div>
                  <p className="mt-1 text-xs text-charcoal/60">
                    {freeDelivery ? "Free delivery to main centres applies." : `Free delivery on orders over ${rand(BRAND.freeDeliveryOver)}.`}
                  </p>
                  <button onClick={() => setView("checkout")} className="btn btn-primary mt-4 w-full">Proceed to checkout</button>
                </div>
              </>
            ) : (
              <form onSubmit={pay} className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex-1 space-y-4 p-5">
                  <input required name="name" placeholder="Full name" className="input" autoComplete="name" />
                  <input required type="email" name="email" placeholder="Email" className="input" autoComplete="email" />
                  <input required name="phone" placeholder="Phone / WhatsApp" className="input" autoComplete="tel" />

                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-walnut">Delivery</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {([["deliver", "Delivery"], ["collect", "Collect from workshop"]] as const).map(([v, label]) => (
                        <label key={v} className={`cursor-pointer rounded-lg border p-3 text-center text-sm ${delivery === v ? "border-walnut bg-walnut text-cream" : "border-walnut/20"}`}>
                          <input type="radio" className="sr-only" checked={delivery === v} onChange={() => setDelivery(v)} />
                          {label}
                        </label>
                      ))}
                    </div>
                    {delivery === "deliver" && (
                      <>
                        <textarea required name="address" rows={3} placeholder="Delivery address" className="input mt-3" autoComplete="street-address" />
                        {!freeDelivery && <p className="mt-1 text-xs text-charcoal/60">Delivery is quoted by area and confirmed with you before the build starts.</p>}
                      </>
                    )}
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-walnut">Payment</legend>
                    <div className="space-y-2">
                      {([["full", `Pay in full · ${rand(total)}`], ["deposit", `Pay 50% deposit now · ${rand(Math.ceil(total / 2))}`]] as const).map(([v, label]) => (
                        <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${mode === v ? "border-walnut bg-white" : "border-walnut/20"}`}>
                          <input type="radio" checked={mode === v} onChange={() => setMode(v)} />
                          {label}
                        </label>
                      ))}
                    </div>
                    {mode === "deposit" && <p className="mt-1 text-xs text-charcoal/60">Balance of {rand(total - amountDue)} is due before delivery.</p>}
                  </fieldset>
                </div>

                <div className="border-t border-walnut/10 p-5">
                  {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
                  <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
                    <Lock size={16} /> {busy ? "Opening secure payment…" : `Pay ${rand(amountDue)} securely`}
                  </button>
                  <button type="button" onClick={() => setView("cart")} className="mt-3 w-full text-sm text-walnut underline">Back to cart</button>
                  <p className="mt-3 text-center text-xs text-charcoal/50">Card and instant EFT, processed by Paystack. We never see your card details.</p>
                </div>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
