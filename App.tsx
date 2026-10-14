import { useEffect } from "react";
import { CartProvider } from "./cart";
import { BRAND } from "./config";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Collections from "./components/Collections";
import Shop from "./components/Shop";
import Craft from "./components/Craft";
import CustomOrder from "./components/CustomOrder";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import SectionRail from "./components/SectionRail";
import { DeliveryStrip, FAQ, Testimonials } from "./components/Sections";

export default function App() {
  // Search-engine structured data, built from the brand settings.
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      name: BRAND.name,
      foundingDate: String(BRAND.founded),
      description: BRAND.sub,
      email: BRAND.email,
      telephone: BRAND.phone,
      address: BRAND.address,
      areaServed: "ZA",
      currenciesAccepted: "ZAR",
    });
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <DeliveryStrip />
        <Story />
        <Collections />
        <Shop />
        <Craft />
        <CustomOrder />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <CartDrawer />
      <SectionRail />
      <Cursor />
    </CartProvider>
  );
}
