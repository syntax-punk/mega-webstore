import { useEffect } from "react";
import { ProductList } from "./ProductList";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors, setProductParams } from "./catalogSlice";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { ProductSearch } from "./ProductSearch";
import { RadioButtonGroup } from "../../app/components/RadioButtonGroup";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' },
];

function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, filtersLoaded, status, brands, types, productParams } = useAppSelector(({ catalogSlice }) => catalogSlice);
  const dispatch = useAppDispatch();

  useEffect(function fetchProductsOnMount() {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    
  }, [dispatch, productsLoaded])


  useEffect(function fetchFiltersOnMount() {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
    
  }, [dispatch, filtersLoaded])

  if (status.includes("pending")) return <LoadingComponent message="Getting data ready ..."/>

  return (
    <Grid container spacing={4}>
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
          <FormGroup>
            {brands.map((brand, idx) => (
              <FormControlLabel key={idx} control={<Checkbox />} label={brand} />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{mb: 2, p: 2}}>
          <FormGroup>
            {types.map((type, idx) => (
              <FormControlLabel key={idx} control={<Checkbox />} label={type} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products } />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            Displaying 1-6 of 20
          </Typography>
          <Pagination count={10} color="primary" size="large" page={2} />
        </Box>
      </Grid>
    </Grid>
  )
}

export { Catalog }