import { useEffect } from "react";
import { productsSelectors, fetchProductsAsync, fetchFiltersAsync } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export function useProducts() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metadata } = useAppSelector(({ catalogSlice }) => catalogSlice);
  const dispatch = useAppDispatch();

  useEffect(function fetchProductsOnMount() {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded])


  useEffect(function fetchFiltersOnMount() {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded])

  return { products, productsLoaded, filtersLoaded, brands, types, metadata }
}