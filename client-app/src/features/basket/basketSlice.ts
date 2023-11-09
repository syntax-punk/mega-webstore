import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      if (!state.basket) return;
      const { productId, quantity } = action.payload;
      
      const itemIndex = state.basket.items.findIndex(item => item.productId === productId);
      if (itemIndex === -1) return;

      if (state.basket.items[itemIndex].quantity <= quantity) {
        state.basket.items.splice(itemIndex, 1);
      } else {
        state.basket.items[itemIndex].quantity -= quantity;
      }
    }
  }
});

export const { 
  setBasket, 
  removeItem 
} = basketSlice.actions;