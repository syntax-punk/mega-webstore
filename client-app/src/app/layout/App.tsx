import { useEffect, useState } from "react"
import { Product } from "../models/product"
import { Catalog } from "../../features/catalog/Catalog"
import { Header } from "./Header"
import { Container, CssBaseline } from "@mui/material"

function App() {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(function fetchProducts() {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} />
      </Container>
    </>
  )
}

export default App
