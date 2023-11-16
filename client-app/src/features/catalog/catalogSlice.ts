import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk(
  'catalog/fetchProductsAsync',
  async () => {
    try {
      return await agent.Catalog.list();
    } catch (error) {
      console.error(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState({
    productsLoaded: false,
    status: "idle"
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts"
    }),
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    }),
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    })
  }
});

export const productsSelectors = productAdapter.getSelectors((state: RootState) => state.catalogSlice);