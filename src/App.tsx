import { useContext } from "react";
import { BasketContext } from "@/context/createBasketContext";
import { PRODUCTS } from "@/basket/config";
import "./App.css";

export default function App() {
  const context = useContext(BasketContext);
  
  if (!context) {
    throw new Error("App must be used within BasketProvider");
  }
  
  const { dispatch, total } = context;

  return (
    <div className="container">
      <h1>Acme Widget Co</h1>

      <div className="products">
        {Object.values(PRODUCTS).map(product => (
          <button
            key={product.code}
            onClick={() =>
              dispatch({ type: "ADD_ITEM", payload: product.code })
            }
          >
            {product.name} (${product.price})
          </button>
        ))}
      </div>

      <div className="total">Total: ${total}</div>
    </div>
  );
}
