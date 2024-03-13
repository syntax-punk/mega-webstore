import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { currencyFormat } from "../../app/utils/misc"
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice"
import { BasketItem } from "../../app/models/basket"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";


interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

function BasketTable({ items, isBasket = true}: Props) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(({ basketSlice }) => basketSlice);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            { isBasket &&  <TableCell align="right"></TableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
                  { isBasket &&
                      <LoadingButton 
                        loading={status === ("pendingRemoveItem" + item.productId)}
                        color="primary" 
                        size="small" 
                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId }))}>
                          <Remove />
                      </LoadingButton>
                  }
                  <span style={{ fontSize: '16px' }}>
                    {item.quantity}
                  </span>
                  { isBasket &&
                    <LoadingButton 
                      loading={status === ("pendingAddItem" + item.productId)}
                      color="primary" 
                      size="small" 
                      onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}>
                        <Add />
                    </LoadingButton>
                  }
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
              { isBasket &&
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
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { BasketTable }