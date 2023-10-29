import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import { ProductList } from "./ProductList";
import { agent } from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(function fetchProducts() {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <LoadingComponent message="Getting products ..."/>

  return (
    <ProductList products={products } />
  )
}

export { Catalog }