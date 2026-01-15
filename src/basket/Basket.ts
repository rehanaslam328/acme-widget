export type Product = {
  code: string;
  name: string;
  price: number;
};

export type DeliveryRule = {
  minTotal: number;
  charge: number;
};

export type Offer = (items: string[], products: Record<string, Product>) => number;

export class Basket {
  private products: Record<string, Product>;
  private deliveryRules: DeliveryRule[];
  private offers: Offer[];
  private items: string[] = [];

  constructor(
    products: Record<string, Product>,
    deliveryRules: DeliveryRule[],
    offers: Offer[]
  ) {
    this.products = products;
    this.deliveryRules = deliveryRules;
    this.offers = offers;
  }

  add(productCode: string): void {
    if (!this.products[productCode]) {
      throw new Error(`Product code "${productCode}" not found in catalogue`);
    }
    this.items.push(productCode);
  }

  total(): number {
    const subtotal = this.items.reduce(
      (sum, code) => sum + this.products[code].price,
      0
    );

    const discount = this.offers.reduce(
      (total, offer) => total + offer(this.items, this.products),
      0
    );

    const discountedTotal = subtotal - discount;

    const deliveryCharge =
      [...this.deliveryRules]
        .sort((a, b) => b.minTotal - a.minTotal)
        .find(rule => discountedTotal >= rule.minTotal)?.charge ?? 0;

    return Number((discountedTotal + deliveryCharge).toFixed(2));
  }

  // For backward compatibility and testing with explicit items array
  calculateTotal(items: string[]): number {
    const subtotal = items.reduce(
      (sum, code) => sum + this.products[code].price,
      0
    );

    const discount = this.offers.reduce(
      (total, offer) => total + offer(items, this.products),
      0
    );

    const discountedTotal = subtotal - discount;

    const deliveryCharge =
      [...this.deliveryRules]
        .sort((a, b) => b.minTotal - a.minTotal)
        .find(rule => discountedTotal >= rule.minTotal)?.charge ?? 0;

    return Number((discountedTotal + deliveryCharge).toFixed(2));
  }
}
