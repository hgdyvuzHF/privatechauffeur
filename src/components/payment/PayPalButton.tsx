import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency = "USD", onSuccess }) => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    setSdkReady(true);
    console.log("PayPal Button Loaded"); // Debugging
  }, []);

  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      {sdkReady ? (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            console.log("Creating PayPal Order..."); // Debugging
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                    currency_code: currency,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Transaction Approved", details); // Debugging
              onSuccess(details);
            });
          }}
          onError={(err) => {
            console.error("PayPal Error:", err); // Debugging
          }}
        />
      ) : (
        <p>Loading PayPal...</p>
      )}
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
