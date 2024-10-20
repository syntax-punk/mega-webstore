import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Metadata } from "../../app/models/pagination";

interface CatalogState {
  productsLoaded: boolean,
  filtersLoaded: boolean,
  status: string,
  brands: string[],
  types: string[],
  productParams: ProductParams,
  metadata: Metadata | null
}

function initParams(): ProductParams {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    brands: [],
    types: [],
  }
}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams): URLSearchParams {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm) params.append("searchTerm", productParams.searchTerm);
  if (productParams.types.length) params.append("types", productParams.types.toString());
  if (productParams.brands.length) params.append("brands", productParams.brands.toString());
  return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalogSlice.productParams);
    try {
      const result = await agent.Catalog.list(params);
      thunkAPI.dispatch(setMetadata(result.metadata));
      return result.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error.data
      });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProductAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Catalog.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error.data
      });
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  'catalog/fetchFiltersAsync',
  async (_, thunkAPI) => {
    try {
      return agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metadata: null
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setProduct: (state, action) => {
      productAdapter.upsertOne(state, action.payload); // upsertOne will add or update the product and it is a little pointless at the moment
      state.productsLoaded = false;
    },
    removeProduct: (state, action) => {
      productAdapter.removeOne(state, action.payload);  // and it's a little pointless at the moment as well
      state.productsLoaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts"
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "idle";
    });

    
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct"
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      if (!action.payload) {
        state.status = "idle";
        return;
      }
      
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "idle";
    });


    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "idle";
    });
  }
});

export const productsSelectors = productAdapter.getSelectors((state: RootState) => state.catalogSlice);

export const { setProductParams, setMetadata, resetProductParams, setPageNumber, setProduct, removeProduct } = catalogSlice.actions;