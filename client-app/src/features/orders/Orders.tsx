import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { agent } from "../../app/api/agent";
import { Order } from "../../app/models/order";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/utils/misc";
import { OrderDetails } from "./OrderDetails";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(0);

  useEffect(() => {
    agent.Orders.list()
      .then(response => setOrders(response))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />

  if (selectedOrderId > 0) {
    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) throw new Error('Order not found');

    return (
      <OrderDetails order={order} setSelectedOrder={() => setSelectedOrderId(0)} />
    )
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2}} variant="h5">
          Your Orders:
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setSelectedOrderId(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export { Orders }