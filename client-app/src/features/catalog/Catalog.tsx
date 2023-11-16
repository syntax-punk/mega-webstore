import { useEffect } from "react";
import { ProductList } from "./ProductList";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productsSelectors } from "./catalogSlice";

function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector(({ catalogSlice }) => catalogSlice);
  const dispatch = useAppDispatch();
  

  useEffect(function fetchProducts() {
    if (productsLoaded) return;

    dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded])

  if (status.includes("pending")) return <LoadingComponent message="Getting products ..."/>

  return (
    <ProductList products={products } />
  )
}

export { Catalog }