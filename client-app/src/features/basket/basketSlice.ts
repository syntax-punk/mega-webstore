import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle"
};

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.error(error);
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    }),
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    }),
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    })
  }
});

export const { 
  setBasket, 
  removeItem 
} = basketSlice.actions;