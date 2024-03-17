import { Box, Button, Grid, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import { BasketTable } from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import { BasketSummary } from "../basket/BasketSummary";

interface Props {
    order: Order;
    setSelectedOrder: VoidFunction;
}

function OrderDetails({ order, setSelectedOrder }: Props) {
  const subtotal = order.orderItems
    .reduce((current, { price, quantity }) => (current + (price * quantity)), 0);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2}} variant="h5">
          Order Number: {order.id} - {order.orderStatus}
        </Typography>
        <Button onClick={setSelectedOrder} sx={{ m:2 }} size="large" variant="contained">Back to orders</Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  )
}

export { OrderDetails }