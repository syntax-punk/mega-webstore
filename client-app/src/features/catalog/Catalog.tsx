import { useEffect } from "react";
import { ProductList } from "./ProductList";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import { ProductSearch } from "./ProductSearch";
import { RadioButtonGroup } from "../../app/components/RadioButtonGroup";
import { CheckboxButtons } from "../../app/components/CheckboxButtons";
import { AppPagination } from "../../app/components/AppPagination";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' },
];

function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, productParams, metadata } = useAppSelector(({ catalogSlice }) => catalogSlice);
  const dispatch = useAppDispatch();

  useEffect(function fetchProductsOnMount() {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    
  }, [dispatch, productsLoaded])


  useEffect(function fetchFiltersOnMount() {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
    
  }, [dispatch, filtersLoaded])

  if (!filtersLoaded) return <LoadingComponent message="Getting data ready ..."/>

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}}>
          <ProductSearch />
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
        <RadioButtonGroup 
          options={sortOptions} 
          selectedValue={productParams.orderBy}
          onChange={(event) => {
            dispatch(setProductParams({ orderBy: event.target.value  }))
          }}
        />
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <CheckboxButtons 
            items={brands} 
            checked={productParams.brands}
            onChange={(values: string[]) => dispatch(setProductParams({ brands: values }))} />
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <CheckboxButtons 
            items={types} 
            checked={productParams.types}
            onChange={(values: string[]) => dispatch(setProductParams({ types: values }))} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products } />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mt: 2, mb: 2 }}>
        { metadata && 
          <AppPagination 
            metadata={metadata} 
            onPageChange={(page: number) => {
              dispatch(setPageNumber({ pageNumber: page }))
            }} />
        }
      </Grid>
    </Grid>
  )
}

export { Catalog }