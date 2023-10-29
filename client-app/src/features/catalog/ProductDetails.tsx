import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(function fetchProduct() {
    if (!id) return;

    agent.Catalog.details(parseInt(id))
      .then(response => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

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
      </Grid>
    </Grid>
  );
}

export { ProductDetails }