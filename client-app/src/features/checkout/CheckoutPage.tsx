import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import { PaymentForm } from "./PaymentForm";
import { Review } from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./checkoutValidation";
import { agent } from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";

export type CardState = {
    elementError: {[key in StripeElementType]?: string}
  }
  
export type CardComplete = {
    cardNumber: boolean;
    cardExpiry: boolean;
    cardCvc: boolean;
}

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function CheckoutPage() {
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const validationSchema = validationSchemas[activeStep];
    const dispatch = useAppDispatch();
    const { basket } = useAppSelector(state => state.basketSlice);
    const stripe = useStripe();
    const elements = useElements();

    const [cardState, setCardState] = useState<CardState>({ elementError: {} });
    const [cardComplete, setCardComplete] = useState<CardComplete>({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false
    });
    const [paymentMessage, setPaymentMessage] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
  
    function onCardInputChange(event: any) {
      setCardState({
        ...cardState,
        elementError: {
          ...cardState.elementError,
          [event.elementType]: event.error?.message
        }
      });
  
      setCardComplete({
        ...cardComplete,
        [event.elementType]: event.complete
      })
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        agent.Account.fetchAddress().then(response => {
            if (response) {
                methods.reset({ 
                    ...methods.getValues(),
                    ...response,
                    saveAddess: false 
                });
            }
        });
    }, [methods]);

    async function submitOrder(data: FieldValues) {
        setLoading(true);
        const { nameOnCard, saveAddress, ...shippingAddress } = data;
        
        if (!stripe || !elements) return;
        if (!basket || !basket.clientSecret) return;

        try {
            const cardElement = elements.getElement(CardNumberElement);
            if (!cardElement) return;

            const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            });
            console.log("paymentResult: ", paymentResult);
            if (paymentResult.paymentIntent?.status === "succeeded") {
                const orderNr = await agent.Orders.create({saveAddress, shippingAddress});
                setOrderNumber(orderNr);
                setPaymentSuccess(true);
                setPaymentMessage("Thank you! We have received your payment.");
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
            } else {
                setPaymentMessage(paymentResult.error?.message || "Sorry, we were unable to process your payment.");
                setPaymentSuccess(false);
                setActiveStep(activeStep + 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNext = async (data: FieldValues) => {
        if (activeStep === steps.length - 1) {
            await submitOrder(data);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function submitDisabled(): boolean {
        if (activeStep === steps.length - 1) {
            const result = !cardComplete.cardNumber
                || !cardComplete.cardExpiry
                || !cardComplete.cardCvc
                || !methods.formState.isValid

            return result;
        }
        return !methods.formState.isValid
    }

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                {paymentMessage}
                            </Typography>
                            {paymentSuccess 
                                ? (
                                    <Typography variant="subtitle1">
                                        Your order number is #{orderNumber}. We have not emailed your order
                                        confirmation, and will not send you an update when your order has
                                        shipped. As this is a demo app, we will not charge your credit card.
                                    </Typography>
                                )
                                : (
                                    <Button variant="contained" onClick={handleBack}>
                                        Go back and try again
                                    </Button>
                                )
                            }
                        </>
                    ) : (
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                        Back
                                    </Button>
                                )}
                                <LoadingButton
                                    disabled={submitDisabled()}
                                    variant="contained"
                                    type="submit"
                                    sx={{mt: 3, ml: 1}}
                                    loading={loading}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </LoadingButton>
                            </Box>
                        </form>
                    )}
                </>
            </Paper>
        </FormProvider>
    );
}

export { CheckoutPage };