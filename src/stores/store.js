import { createContext, useContext } from "react";
import AccountStore from "./accountStore";

export const store = {
  accountStore: new AccountStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
