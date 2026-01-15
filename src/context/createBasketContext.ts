import { createContext } from "react";

export type State = {
  items: string[];
};

export type Action = { type: "ADD_ITEM"; payload: string };

export type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
  total: number;
};

export const BasketContext = createContext<ContextValue | null>(null);
