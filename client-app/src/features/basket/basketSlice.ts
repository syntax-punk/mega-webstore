import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";
import { getCookie } from "../../app/utils/misc";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle"
};

const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    }
  }
)

const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity?: number, del?: boolean }>(
  "basket/removeBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    }),

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      const { productId, del } = action.meta.arg;
      state.status = del 
        ? "pendingDeleteItem" + productId
        : "pendingRemoveItem" + productId;
    }),
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (!state.basket) return;

      const { productId, quantity = 1 } = action.meta.arg;

      const itemIndex = state.basket.items.findIndex(item => item.productId === productId);
      if (itemIndex === -1) return;

      if (state.basket.items[itemIndex].quantity <= quantity) {
        state.basket.items.splice(itemIndex, 1);
      } else {
        state.basket.items[itemIndex].quantity -= quantity;
      }
    }),
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = "idle";
    }),

    builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    }),
    builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
      console.error(action.payload);
      state.status = "idle";
    })
  }
});

export const { 
  setBasket,
  clearBasket
} = basketSlice.actions;

export {
  basketSlice,
  addBasketItemAsync,
  removeBasketItemAsync,
  fetchBasketAsync
}