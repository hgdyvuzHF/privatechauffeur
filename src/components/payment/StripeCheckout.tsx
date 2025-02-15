import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../utils/sendEmail";
import { submitGlobalBooking } from "../../utils/globalBooking";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const CheckoutForm: React.FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const htmlTemplate = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        text-align: center;
        font-size: 24px;
        border-radius: 6px 6px 0 0;
      }
      .details {
        margin-top: 15px;
      }
      .details p {
        margin: 8px 0;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Passenger Booking Details</div>
      <div class="details">
        <p><strong>Number of Passengers:</strong> {{numberOfPassengers}}</p>
        <p><strong>Number of Bags:</strong> {{numberOfBags}}</p>
        <p><strong>Pickup Address:</strong> {{pickupAddress}}</p>
        <p><strong>Pickup Instructions:</strong> {{pickupInstructions}}</p>
        <p><strong>Dropoff Address:</strong> {{dropoffAddress}}</p>
        <p><strong>Dropoff Instructions:</strong> {{dropoffInstructions}}</p>
        <p><strong>Flight Number:</strong> {{flightNumber}}</p>
        <p><strong>First Name:</strong> {{firstName}}</p>
        <p><strong>Last Name:</strong> {{lastName}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        <p><strong>Special Requests:</strong> {{specialRequests}}</p>
        <p><strong>Accept Terms:</strong> {{acceptTerms}}</p>
      </div>
      <div class="footer">
        This is an automated email. Please do not reply.
      </div>
    </div>
  </body>
</html>

  `;
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Veuillez entrer les détails de la carte.");
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message || "Le paiement a échoué.");
      setIsProcessing(false);
      return;
    }

    console.log("Stripe Payment Successful:", paymentMethod);
    setIsProcessing(false);
        
    const bookingDetailsFormObject = JSON.parse(localStorage.getItem('BookingDetails') || "{}");
    const email = bookingDetailsFormObject.email;

    const filledHtml = htmlTemplate.replace(/{{(.*?)}}/g, (_:any, key:any) => bookingDetailsFormObject[key.trim()] || 'N/A');
    sendEmail(
          {
            "to": email,
            "subject": "Payment service confirmation",
            "html": filledHtml
          }
        );
    submitGlobalBooking();
    navigate("/thank-you");
  };

  return (
    <div  className="stripe-form bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Card Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de carte
          </label>
          <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
              className="outline-none"
            />
          </div>
        </div>

        {/* Expiry Date & CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 px-3 py-2 focus:border-[#4d0505] focus:ring focus:ring-red-200"
              placeholder="MM/YY"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 px-3 py-2 focus:border-[#4d0505] focus:ring focus:ring-red-200"
              placeholder="123"
              disabled
            />
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom sur la carte
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 px-3 py-2 focus:border-[#4d0505] focus:ring focus:ring-red-200"
            placeholder="John Doe"
            disabled
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Pay Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!stripe || isProcessing}
        className="mt-6 w-full text-white py-2 px-4 rounded-lg font-medium text-lg disabled:opacity-50"
        style={{ backgroundColor: "rgb(77 5 5 / var(--tw-bg-opacity))" }}
      >
        {isProcessing ? "Traitement en cours..." : `Payer $${amount}`}
      </button>
    </div>
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
