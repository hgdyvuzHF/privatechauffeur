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
<html lang="en" style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmation - Private Chauffeur</title>
  </head>
  <body style="margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">
            <tr style="background-color: #000;">
              <td style="padding: 30px; text-align: center; color: #fff;">
                <h1 style="margin: 0; font-size: 24px;">Private Chauffeur</h1>
                <p style="margin: 5px 0 0;">Your trusted luxury transportation service</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <h2 style="margin-top: 0; color: #222;">Thank you for your reservation!</h2>
                <p style="font-size: 16px; color: #555;">
                  Dear <strong>{{firstName}} {{lastName}}</strong>,
                </p>
                <p style="font-size: 16px; color: #555;">
                  We are pleased to confirm your booking with <strong>Private Chauffeur</strong>. Please find the details of your reservation below:
                </p>

                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
                  <tr style="background-color: #f9f9f9;">
                    <td><strong>Number of Passengers:</strong></td>
                    <td>{{numberOfPassengers}}</td>
                  </tr>
                  <tr>
                    <td><strong>Number of Bags:</strong></td>
                    <td>{{numberOfBags}}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td><strong>Pickup Address:</strong></td>
                    <td>{{pickupAddress}}</td>
                  </tr>
                  <tr>
                    <td><strong>Pickup Instructions:</strong></td>
                    <td>{{pickupInstructions}}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td><strong>Dropoff Address:</strong></td>
                    <td>{{dropoffAddress}}</td>
                  </tr>
                  <tr>
                    <td><strong>Dropoff Instructions:</strong></td>
                    <td>{{dropoffInstructions}}</td>
                  </tr>
                  <tr style="background-color: #f9f9f9;">
                    <td><strong>Flight Number:</strong></td>
                    <td>{{flightNumber}}</td>
                  </tr>
                  <tr>
                    <td><strong>Special Requests:</strong></td>
                    <td>{{specialRequests}}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Method:</strong></td>
                    <td>{{paymentMethod}}</td>
                  </tr>
                </table>

                <p style="font-size: 16px; color: #555; margin-top: 20px;">
                  We will contact you shortly if we need any additional information.
                </p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

                <h3 style="color: #222;">Passenger Contact</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> {{firstName}} {{lastName}}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> {{email}}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {{phone}}</p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 14px; color: #999;">
                  ✅ Terms accepted<br />
                  📩 This is an automated email. Please do not reply.
                </p>
              </td>
            </tr>
            <tr style="background-color: #000;">
              <td style="padding: 20px; text-align: center; color: #fff; font-size: 14px;">
                © 2025 PrivateChauffeur.fr | All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
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
    bookingDetailsFormObject.paymentMethod = "Stripe";
    localStorage.setItem('BookingDetails', JSON.stringify(bookingDetailsFormObject));
    var filledHtml = htmlTemplate.replace(/{{(.*?)}}/g, (_:any, key:any) => bookingDetailsFormObject[key.trim()] || 'N/A');
    filledHtml = htmlTemplate.replace(/[[(.*?)]]/g, (_:any, key:any) => luggageServiceEnabledFormObject[key.trim()] || 'N/A');
    sendEmail(
          {
            "to": email,
            "subject": "Payment service confirmation",
            "html": filledHtml
          }
        );
    sendEmail(
              {
                "to": import.meta.env.EMAIL_ADMIN || "contact@privatechauffeur.fr",
                "subject": "Payment service confirmation*",
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
