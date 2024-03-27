import { Elements } from "@stripe/react-stripe-js";
import { CheckoutPage } from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { agent } from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import { LoadingComponent } from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe("pk_test_51OvhynDehHzAKmgUUStWbWhtL68TEN92eCr3UW6Vw7k7IS4SMlW20KdEpvp3Qw7suIYaY7JI7t7xp5Q5KV4vAjZ2008hzt2Go7");

function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }, [dispatch])

  if (loading) return <LoadingComponent message="Loading checkout ..." />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}

export { CheckoutWrapper }