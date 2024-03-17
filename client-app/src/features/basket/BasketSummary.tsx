import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyFormat } from "../../app/utils/misc";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
    subtotal?: number;
}

function BasketSummary({ subtotal }: Props) {
    const { basket } = useAppSelector(({ basketSlice }) => basketSlice);
    if (!basket && !subtotal) {
        throw new Error('Please provide subtotal or make sure basket exsit in order to calculate subtotal');
        return null;
    }

    const subtotalValue = subtotal 
        ? subtotal 
        : basket
            ? basket.items
                .reduce((current, { price, quantity }) => (current + (price * quantity)), 0)
            : 0;
        
    const deliveryFee = subtotalValue > 10000 ? 0 : 2500;

    return (
      <TableContainer component={Paper} variant={'outlined'}>
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">{currencyFormat(subtotalValue)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell colSpan={2}>Delivery fee*</TableCell>
                      <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">{currencyFormat(subtotalValue + deliveryFee)}</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                      </TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
    )
}
export { BasketSummary }