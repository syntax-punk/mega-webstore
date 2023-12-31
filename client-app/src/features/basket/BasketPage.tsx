import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";
import { currencyFormat } from "../../app/utils/misc";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

function BasketPage() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector(({ basketSlice }) => basketSlice);

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  const subtotal = basket.items
    .reduce((current, { price, quantity }) => (current + (price * quantity)), 0);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50,  marginRight: 20 }}/>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <LoadingButton 
                      loading={status === ("pendingRemoveItem" + item.productId)}
                      color="primary" 
                      size="small" 
                      onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId }))}>
                        <Remove />
                    </LoadingButton>
                    <span style={{ fontSize: '16px' }}>
                      {item.quantity}
                    </span>
                    <LoadingButton 
                      loading={status === ("pendingAddItem" + item.productId)}
                      color="primary" 
                      size="small" 
                      onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}>
                        <Add />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton 
                    loading={status === ("pendingDeleteItem" + item.productId)}
                    size="small" 
                    color="error" 
                    onClick={() => dispatch(removeBasketItemAsync({
                      productId: item.productId,
                      quantity: item.quantity,
                      del: true
                    }))}>
                      <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
          <Button 
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export { BasketPage }