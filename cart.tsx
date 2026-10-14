import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./data/products";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage may be blocked; cart still works in memory */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      open,
      setOpen,
      add: (p) => {
        setLines((ls) => {
          const found = ls.find((l) => l.product.id === p.id);
          return found
            ? ls.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l))
            : [...ls, { product: p, qty: 1 }];
        });
        setOpen(true);
      },
      setQty: (id, qty) =>
        setLines((ls) =>
          qty <= 0 ? ls.filter((l) => l.product.id !== id) : ls.map((l) => (l.product.id === id ? { ...l, qty } : l))
        ),
      clear: () => setLines([]),
    }),
    [lines, open]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
