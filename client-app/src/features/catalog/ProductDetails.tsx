import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productsSelectors } from "./catalogSlice";

function ProductDetails() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector(({ basketSlice }) => basketSlice);
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productsSelectors.selectById(state, id!))
  const { status: productStatus } = useAppSelector(({ catalogSlice }) => catalogSlice);

  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState<BasketItem | undefined>(undefined);
  
  useEffect(function onMount() {
    if (!id) return;
    if (product) return;
    
    dispatch (fetchProductAsync(parseInt(id)));
  }, [dispatch, id, product]);

  useEffect(function updateQuantity() {
    if (!product || !basket) return;
    const item = basket?.items.find(i => i.productId === product?.id);
    if (!item) return;
    
    setItem(item);
    setQuantity(item.quantity);
  }, [product, basket]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.target.value) < 0) return;
    setQuantity(parseInt(event.target.value));
  }

  async function handleUpdateCart() {
    if (!product) return;
    
    if (!item || quantity > item.quantity) {
      const quantityToAdd = item ? quantity - item.quantity : quantity;

      dispatch(addBasketItemAsync({
        productId: product.id,
        quantity: quantityToAdd
      }));
    } else {
      const quantityToRemove = item.quantity - quantity;

      dispatch(removeBasketItemAsync({
        productId: product.id,
        quantity: quantityToRemove
      }));
    }
  }

  function isButtonDisabled() {
    if (!item && quantity === 0) return true;
    if (item && item.quantity === quantity) return true;

    return false;
  }

  if (productStatus.includes("pending")) return <LoadingComponent message="Loading product ..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" textAlign="center">{product.name}</Typography>
        <Divider sx={{ mb: 4 }}/>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          color="secondary"
          textAlign="center"
          marginBottom={4}>
            ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              disabled={isButtonDisabled()}
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
            >
              {item ? 'Update Cart' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ProductDetails }