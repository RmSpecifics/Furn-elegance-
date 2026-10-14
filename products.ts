import { IMG } from "./images";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  was?: number;
  blurb: string;
  image: string;
  pos?: string; // CSS object-position for the crop
  isNew?: boolean;
}

export const CATEGORIES = ["All", "Living", "Kitchen & Bar", "Study"] as const;

// Sample catalogue: replace names and prices with your own.
export const PRODUCTS: Product[] = [
  { id: "p1", name: "Cove Modular Sectional", category: "Living", price: 38999, blurb: "Deep-seat modular sofa with matching ottoman, upholstered to order.", image: IMG.showroom, pos: "30% 60%", isNew: true },
  { id: "p2", name: "Tobacco Leather Curved Sofa", category: "Living", price: 42999, blurb: "A soft, curved silhouette in full-grain leather.", image: IMG.leather, pos: "50% 50%" },
  { id: "p3", name: "Cocoon Swivel Chair", category: "Living", price: 14999, blurb: "Sculpted swivel chair in bouclé, chenille or velvet.", image: IMG.swivel, pos: "62% 50%", isNew: true },
  { id: "p4", name: "Walnut & Bouclé Counter Stool", category: "Kitchen & Bar", price: 3999, blurb: "Solid walnut frame, brass footrail and a cloud-soft seat.", image: IMG.stool, pos: "50% 40%" },
  { id: "p5", name: "Studio Task Chair", category: "Study", price: 6499, blurb: "A sculpted work chair on a swivel base, in soft green upholstery.", image: IMG.studio, pos: "20% 55%" },
];
