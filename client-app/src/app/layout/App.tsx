import { useEffect, useState } from "react"
import { Product } from "../models/product"
import { Catalog } from "../../features/catalog/Catalog"
import { Typography } from "@mui/material"

function App() {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(function fetchProducts() {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
  }, [])

  return (
    <div>
      <Typography variant="h1">Mega Catalog</Typography>
      <Catalog products={products} />
    </div>
  )
}

export default App
