import { ENV } from "./config";

/**
 * Sends a form to Formspree (emails the owner) when VITE_FORMSPREE_ID is set.
 * Otherwise opens WhatsApp with the details pre-filled so nothing is lost.
 */
export async function submitForm(subject: string, data: Record<string, string>): Promise<"email" | "whatsapp"> {
  if (ENV.formspreeId) {
    const res = await fetch(`https://formspree.io/f/${ENV.formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, ...data }),
    });
    if (!res.ok) throw new Error("Form service rejected the submission");
    return "email";
  }
  const text = `${subject}\n` + Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
  window.open(`https://wa.me/${ENV.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  return "whatsapp";
}
