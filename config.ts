// Edit these values to make the site yours.
export const BRAND = {
  name: "Sable & Oak",
  descriptor: "Furniture Makers",
  founded: 2003,
  tagline: "Made by hand since 2003.",
  sub: "Handcrafted furniture, built to order in our own workshop and now delivered across South Africa.",
  email: "info@sableandoak.co.za",
  phone: "000 000 0000",
  address: "Your workshop address, Town, 0000",
  hours: "Mon–Fri 08:00–17:00 · Sat 09:00–13:00",
  freeDeliveryOver: 15000,
};

export const yearsOfCraft = () => new Date().getFullYear() - BRAND.founded;

// The company story. Only the 2003 start and the move online come from you;
// the middle chapter is generic, so rewrite it with your real milestones.
export const HISTORY = [
  {
    year: String(BRAND.founded),
    title: "The workshop opens",
    text: "We start with a small workshop and one idea: build furniture properly, one piece at a time, and stand behind every joint.",
  },
  {
    year: "The years between",
    title: "Two decades at the bench",
    text: "Our joinery, upholstery and finishing get better with every commission. The methods stay traditional, the standards keep rising.",
  },
  {
    year: String(new Date().getFullYear()),
    title: "Now open online",
    text: "The same hands and the same standards, now available nationwide through a secure online store with a 50% deposit option.",
  },
];

// Real customer reviews go here. While this list is empty the section stays hidden,
// so no placeholder reviews ever appear on the live site.
export const REVIEWS: { name: string; text: string }[] = [];

export const ENV = {
  paystackKey: (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || "",
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID as string) || "",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER as string) || "27000000000",
};

export const rand = (n: number) =>
  "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 }).replace(/,/g, " ");
