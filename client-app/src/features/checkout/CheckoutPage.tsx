import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";
import { PaymentForm } from "./PaymentForm";
import { Review } from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./checkoutValidation";
import { agent } from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";

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

    const [cardState, setCardState] = useState<CardState>({ elementError: {} });
    const [cardComplete, setCardComplete] = useState<CardComplete>({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false
    });
  
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


    const handleNext = async (data: FieldValues) => {
        const { nameOnCard, saveAddress, ...shippingAddress } = data;

        if (activeStep === steps.length - 1) {
            setLoading(true);
            try {
                const orderNr = await agent.Orders.create({saveAddress, shippingAddress});
                setOrderNumber(orderNr);
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
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
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #{orderNumber}. We have not emailed your order
                                confirmation, and will not send you an update when your order has
                                shipped. As this is a demo app, we will not charge your credit card.
                            </Typography>
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