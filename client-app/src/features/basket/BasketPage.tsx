import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

function BasketPage() {
  const [loading, setLoading] = useState(false);
  const[basket, setBasket] = useState<Basket | null>(null);

  useEffect(function loadBasketOnMount() {
    setLoading(true);

    agent.Basket.get()
      .then(basket => {
        setBasket(basket);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingComponent message="Loadgin basket data..." />;

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <h1>Buyer Id = {basket.buyerId}</h1>
  );
}

export { BasketPage }