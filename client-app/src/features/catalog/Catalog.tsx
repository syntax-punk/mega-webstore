import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import { ProductList } from "./ProductList";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(function fetchProducts() {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
  }, [])

  return (
    <ProductList products={products } />
  )
}

export { Catalog }