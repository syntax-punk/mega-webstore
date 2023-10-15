import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
    return (
      <Card>
        <CardMedia
          sx={{ height: 300, backgroundSize: 'cover' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography color="primary" gutterBottom variant="h6" noWrap >
            {product.name}
          </Typography>
          <Typography color="secondary" gutterBottom variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            $ {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    )
}

export { ProductCard }