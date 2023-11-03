import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { agent } from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);

    function handleAddItemToCart(productId: number) {
      setLoading(true);
      agent.Basket.addItem(productId).then(() => {
        console.log('Item added to cart');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
    }

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
          <LoadingButton loading={loading} size="small" onClick={() => handleAddItemToCart(product.id)}>Add to cart</LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
      </Card>
    )
}

export { ProductCard }