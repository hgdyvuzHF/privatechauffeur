import React, { useEffect, useState } from 'react';
import { CreditCard, Truck, AlertCircle } from 'lucide-react';
import PayPalButton from "./PayPalButton";
import StripeCheckout from "./StripeCheckout";
import { useNavigate } from 'react-router-dom';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { sendEmail } from '../../utils/sendEmail';
import { submitGlobalBooking } from '../../utils/globalBooking';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  totalPrice: number;
}
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
export default function PaymentForm({ onSubmit, totalPrice }: PaymentFormProps) {
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal' | 'stripe'>('card');
  const navigate = useNavigate();
  // Load saved form data from localStorage or set default values
  const getInitialFormData = () => {
    const savedData = localStorage.getItem('PaymentForm');
    return savedData ? JSON.parse(savedData) : {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardholderName: '',
      sameAsShipping: true,
      billingAddress: '',
      billingCity: '',
      billingCountry: ''
    };
  };
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [formData, setFormData] = useState(getInitialFormData);

  // Save form data to localStorage on every change
  useEffect(() => {
    localStorage.setItem('PaymentForm', JSON.stringify(formData));
  }, [formData]);

  const handleSuccess = (details: any) => {
    // Here, update backend with payment status
    const bookingDetailsFormObject = JSON.parse(localStorage.getItem('BookingDetails') || "{}");
    const email = bookingDetailsFormObject.email;

    bookingDetailsFormObject.paymentMethod = paymentMethod;
    localStorage.setItem('BookingDetails', JSON.stringify(bookingDetailsFormObject));
    console.log("bookingDetailsFormObject",bookingDetailsFormObject);
    
    const filledHtml = htmlTemplate.replace(/{{(.*?)}}/g, (_:any, key:any) => bookingDetailsFormObject[key.trim()] || 'N/A');
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

  const depositAmount = totalPrice * 0.2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      ...formData, 
      paymentMethod,
      depositAmount: paymentMethod === 'cash' ? depositAmount : null 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Mode de paiement</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                paymentMethod === 'card' 
                  ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-opacity-50' 
                  : 'border-gray-200 hover:border-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-semibold">Carte bancaire</div>
                <div className="text-sm text-gray-500">Paiement sécurisé</div>
              </div>
            </button>

            <button
              type="button"
              className={`p-4 border rounded-lg transition-all ${
                paymentMethod === 'paypal' 
                  ? 'border-[#0070BA] bg-blue-50 ring-2 ring-[#0070BA] ring-opacity-50' 
                  : 'border-gray-200 hover:border-[#0070BA] hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                  alt="PayPal" 
                  className="h-6 object-contain mb-1"
                />
                <div className="text-sm text-gray-500">Paiement rapide</div>
              </div>
            </button>
            <button
              type="button"
              className={`p-4 border rounded-lg transition-all ${
                paymentMethod === 'stripe' 
                  ? 'border-[#0070BA] bg-blue-50 ring-2 ring-[#0070BA] ring-opacity-50' 
                  : 'border-gray-200 hover:border-[#0070BA] hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <img 
                  src="data:image/png;base64,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" 
                  alt="stripe" 
                  className="h-6 object-contain mb-1"
                />
                <div className="text-sm text-gray-500">Paiement Stripe</div>
              </div>
            </button>
            <button
              type="button"
              className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                paymentMethod === 'cash' 
                  ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-opacity-50' 
                  : 'border-gray-200 hover:border-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('cash')}
            >
              <Truck className={`h-6 w-6 ${paymentMethod === 'cash' ? 'text-primary-600' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className="font-semibold">Espèces</div>
                <div className="text-sm text-gray-500">Paiement à la livraison</div>
              </div>
            </button>
          </div>

          {paymentMethod === 'cash' && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">Acompte requis</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Un acompte de {depositAmount.toFixed(2)}€ (20% du montant total) est requis pour confirmer votre réservation. 
                  Cet acompte sera remboursé 24h après la course.
                </p>
              </div>
            </div>
          )}

          {(paymentMethod === 'card' || paymentMethod === 'cash') && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Informations de paiement</h4>
              <Elements stripe={stripePromise}>
                <StripePayment totalPrice={1} />
              </Elements>
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div className="mt-6 text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <PayPalButton amount={1} onSuccess={handleSuccess} />
              </div>
            </div>
          )}
          {paymentMethod === 'stripe' && (
            <div className="mt-6 text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <StripeCheckout amount={1} />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
  /**
 * Stripe Card Payment Component
 */
  function StripePayment({ totalPrice }: { totalPrice: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const handleStripePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        "YOUR_STRIPE_SECRET_KEY",
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );
  
      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        
        const bookingDetailsFormObject = JSON.parse(localStorage.getItem('BookingDetails') || "{}");
        const email = bookingDetailsFormObject.email;

        bookingDetailsFormObject.paymentMethod = "Stripe";
        localStorage.setItem('BookingDetails', JSON.stringify(bookingDetailsFormObject));
        const filledHtml = htmlTemplate.replace(/{{(.*?)}}/g, (_:any, key:any) => bookingDetailsFormObject[key.trim()] || 'N/A');
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
      }
    };
    return (
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <CardElement />
        </div>
        <button
          type="submit"
          onClick={handleStripePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          style={{ backgroundColor: "rgb(77 5 5 / var(--tw-bg-opacity))" }}
          disabled={!stripe}
        >
          Payer {totalPrice.toFixed(2)}€ avec Carte
        </button>
        </div>
    );
  };
