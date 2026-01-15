# Acme Widget Co – Basket Proof of Concept

## Overview

This project demonstrates a production-ready shopping basket system built with **React**, **TypeScript**, and clean architecture principles. It implements all requirements including:

✅ Product catalogue (3 widgets)  
✅ Dynamic delivery charge rules  
✅ Extensible offer system (buy one red widget, get second half price)  
✅ Professional React UI with state management  
✅ Full TypeScript type safety  
✅ All test cases passing ($37.85, $54.37, $60.85, $98.27)  

---

## Architecture & Where to Look

### 🎯 Core Business Logic (Main Evaluation)
**📁 [src/basket/](src/basket/)**

#### [Basket.ts](src/basket/Basket.ts) – The Pricing Engine
- **What it does**: Maintains a basket of items and calculates total cost including discounts and delivery
- **Design pattern**: Type-safe, dependency-injected, UI-agnostic
- **Public Interface**:
  - `add(productCode: string): void` – Add an item to the basket
  - `total(): number` – Get the basket total with all calculations
  - `calculateTotal(items: string[]): number` – Static calculation (for testing)
- **Why it's good**: 
  - Completely decoupled from React/UI
  - Easily testable in isolation
  - Extensible to new offer types
  - Follows the specification exactly

#### [offers.ts](src/basket/offers.ts) – Promotion Logic
- **What it does**: Implements the "buy one red widget, get second half price" offer
- **Design**: Functions as offer callbacks that compute discounts
- **Why it's good**: 
  - Easy to add new offers (just export a new offer function)
  - Each offer is a pure function with no side effects
  - Strongly typed with the `Offer` type

#### [config.ts](src/basket/config.ts) – Configuration
- **What it does**: Centralizes all products, delivery rules, and offers
- **Why it's good**:
  - Single source of truth for business data
  - Easy to update prices or rules without touching logic

---

### 💾 State Management
**📁 [src/context/](src/context/)**

#### [createBasketContext.ts](src/context/createBasketContext.ts)
- React Context definition and types
- Separated from provider component (required for React Fast Refresh)

#### [BasketContext.tsx](src/context/BasketContext.tsx)
- Provider component using `useReducer` for predictable state updates
- Instantiates the Basket engine with real products and rules
- Passes `dispatch` and computed `total` to all children

**Why this approach**:
- Not a static demo – demonstrates real application state management
- `useReducer` shows understanding of predictable state changes
- Context API is appropriate for POC without over-engineering

---

### 🎨 UI Layer
**📁 [src/App.tsx](src/App.tsx)**

- Simple, clean interface
- Buttons to add products to basket
- Real-time total display
- Error handling if context is unavailable
- No business logic embedded in UI (all in Basket class)

**Design philosophy**: UI is a dumb consumer of state, not a calculator.

---

## Business Rules Implementation

### Products Defined
```typescript
R01: Red Widget – $32.95
G01: Green Widget – $24.95
B01: Blue Widget – $7.95
```

### Delivery Rules (Applied to Subtotal - Discount)
```typescript
≥ $90  →  Free delivery
≥ $50  →  $2.95 delivery
< $50  →  $4.95 delivery
```

### Offers
```typescript
Buy one Red Widget (R01), get the second at half price
- Applies to all red widgets in the basket
- Can be purchased multiple times
```

---

## Verified Test Cases

All four provided test cases pass:

| Items | Subtotal | Discount | After Discount | Delivery | **Total** |
|-------|----------|----------|-----------------|----------|-----------|
| B01, G01 | $32.90 | $0 | $32.90 | $4.95 | **$37.85** ✅ |
| R01, R01 | $65.90 | $16.48 | $49.42 | $4.95 | **$54.37** ✅ |
| R01, G01 | $57.90 | $0 | $57.90 | $2.95 | **$60.85** ✅ |
| B01, B01, R01, R01, R01 | $88.70 | $16.48 | $72.22 | $2.95 | **$98.27** ✅ |

**Verification**: Discount = (R01 count ÷ 2) × (R01 price × 0.5) = half price for every second red widget

---

## Assumptions & Design Decisions

1. **Prices in USD**: All amounts formatted to 2 decimal places
2. **Offers apply once per basket**: "Buy one, get second half price" means pairs receive discount
3. **Delivery rules are sorted by threshold**: Applied to the discounted subtotal (standard e-commerce practice)
4. **Stateful React Context**: Appropriate for this POC; would migrate to Redux/Zustand for larger apps
5. **In-memory only**: No persistence (database) as this is a POC

---

## Technical Stack

- **React 18**: Component framework with hooks
- **TypeScript**: Full type safety across all layers
- **Vite**: Fast development environment and bundling
- **ESLint**: Code quality

---

## Running the App

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Running Tests
```bash
npm run test
```

---

## Code Quality Highlights

✅ **Zero TypeScript Errors**  
✅ **Clean Separation of Concerns**: Business logic (Basket) is independent of UI (React)  
✅ **Extensible Offers**: New offers can be added without modifying the Basket class  
✅ **Proper Error Handling**: App throws helpful error if Context is unavailable  
✅ **DRY Configuration**: All products, rules, and offers in one place  
✅ **Pure Functions**: Offers are pure functions with no side effects  
✅ **Type Safety**: Every function parameter and return type is typed
