import { type Product, type DeliveryRule } from "@/basket/Basket";
import { buyOneGetSecondHalfPrice } from "@/basket/offers";

export const PRODUCTS: Record<string, Product> = {
  R01: { code: "R01", name: "Red Widget", price: 32.95 },
  G01: { code: "G01", name: "Green Widget", price: 24.95 },
  B01: { code: "B01", name: "Blue Widget", price: 7.95 }
};

export const DELIVERY_RULES: DeliveryRule[] = [
  { minTotal: 90, charge: 0 },
  { minTotal: 50, charge: 2.95 },
  { minTotal: 0, charge: 4.95 }
];

export const OFFERS = [buyOneGetSecondHalfPrice("R01")];
