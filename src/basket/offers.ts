import { type Offer } from "./Basket.js";

export const buyOneGetSecondHalfPrice =
  (productCode: string): Offer =>
  (items, products) => {
    const count = items.filter(code => code === productCode).length;
    const pairs = Math.floor(count / 2);
    return pairs * products[productCode].price * 0.5;
  };
