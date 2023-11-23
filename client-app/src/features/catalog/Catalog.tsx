import { useEffect } from "react";
import { ProductList } from "./ProductList";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productsSelectors } from "./catalogSlice";

function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, filtersLoaded, status } = useAppSelector(({ catalogSlice }) => catalogSlice);
  const dispatch = useAppDispatch();
  

  useEffect(function fetchProductsOnMount() {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    
  }, [dispatch, productsLoaded])


  useEffect(function fetchFiltersOnMount() {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
    
  }, [dispatch, filtersLoaded])

  if (status.includes("pending")) return <LoadingComponent message="Getting data ready ..."/>

  return (
    <ProductList products={products } />
  )
}

export { Catalog }