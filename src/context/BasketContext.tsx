import { useReducer, type ReactNode } from "react";
import { Basket } from "../basket/Basket";
import { PRODUCTS, DELIVERY_RULES, OFFERS } from "../basket/config";
import { BasketContext, type State, type Action } from "./createBasketContext";

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
}

const basketEngine = new Basket(PRODUCTS, DELIVERY_RULES, OFFERS);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const total = basketEngine.calculateTotal(state.items);

  return (
    <BasketContext.Provider value={{ state, dispatch, total }}>
      {children}
    </BasketContext.Provider>
  );
}
