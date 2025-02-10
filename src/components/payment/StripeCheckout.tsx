import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const CheckoutForm: React.FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setError(error.message || "Payment failed.");
      setIsProcessing(false);
      return;
    }

    console.log("Stripe Payment Successful:", paymentMethod);
    alert("Payment successful!");
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <CardElement className="stripe-card" />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={!stripe || isProcessing} className="stripe-button">
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

const StripeCheckout: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripeCheckout;
