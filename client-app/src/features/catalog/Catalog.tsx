import { Product } from "../../app/models/product";
import { ProductList } from "./ProductList";

interface Props {
  products: Product[];
}

function Catalog({ products }: Props) {
    return (
      <ProductList products={products } />
    )
}

export { Catalog }