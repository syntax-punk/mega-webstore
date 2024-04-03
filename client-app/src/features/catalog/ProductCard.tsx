import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/utils/misc";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
    
    const { status } = useAppSelector(({ basketSlice }) => basketSlice);
    const dispatch = useAppDispatch();

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
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
            loading={status === ("pendingAddItem" + product.id)} 
            size="small" 
            onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}>
              Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
      </Card>
    )
}

export { ProductCard }