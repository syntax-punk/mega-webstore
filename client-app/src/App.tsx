import { useEffect, useState } from "react"

function App() {

  const [products, setProducts] = useState([])

  useEffect(function fetchProducts() {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products))
  }, [])

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
