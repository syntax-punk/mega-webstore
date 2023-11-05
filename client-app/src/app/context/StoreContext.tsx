/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function useStoreContext (): StoreContextValue {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }

  return context;
}


function StoreProvider({ children }: React.PropsWithChildren<unknown>) {

  const [basket, setBasket] = useState<Basket | null>(null);
 
  function removeItem(productId:number, quantity: number) {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex(item => item.productId === productId);
    
    if (itemIndex === -1) return;

    if (items[itemIndex].quantity <= quantity) {
      items.splice(itemIndex, 1);
    } else {
      items[itemIndex].quantity -= quantity;
    }

    setBasket(prev => ({ ...prev!, items,}));
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  )
}

export { 
  StoreContext,
  StoreProvider,
  useStoreContext
}