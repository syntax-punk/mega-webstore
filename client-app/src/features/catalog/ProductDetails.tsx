import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";

function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState<BasketItem | undefined>(undefined);
  
  useEffect(function fetchProduct() {
    if (!id) return;
    
    agent.Catalog.details(parseInt(id))
      .then(response => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

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

    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const quantityToAdd = item ? quantity - item.quantity : quantity;

      try {
        const updatedBasket = await agent.Basket.addItem(product.id, quantityToAdd);
        setBasket(updatedBasket);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    } else {
      const quantityToRemove = item.quantity - quantity;
      
      try {
        await agent.Basket.removeItem(product.id, quantityToRemove);
        removeItem(product.id, quantityToRemove);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  }

  function isButtonDisabled() {
    if (!item && quantity === 0) return true;
    if (item && item.quantity === quantity) return true;

    return false;
  }

  if (loading) return <LoadingComponent message="Loading product ..." />;

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
              loading={submitting}
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