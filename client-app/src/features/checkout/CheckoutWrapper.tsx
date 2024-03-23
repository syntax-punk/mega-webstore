import { Elements } from "@stripe/react-stripe-js";
import { CheckoutPage } from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51OvhynDehHzAKmgUUStWbWhtL68TEN92eCr3UW6Vw7k7IS4SMlW20KdEpvp3Qw7suIYaY7JI7t7xp5Q5KV4vAjZ2008hzt2Go7");

function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}

export { CheckoutWrapper }