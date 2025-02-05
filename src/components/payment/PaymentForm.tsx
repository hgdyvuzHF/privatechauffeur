import React, { useState } from 'react';
import { CreditCard, Truck, AlertCircle } from 'lucide-react';
import PayPalButton from "./PayPalButton";
interface PaymentFormProps {
  onSubmit: (data: any) => void;
  totalPrice: number;
}

export default function PaymentForm({ onSubmit, totalPrice }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'paypal'>('card');
  const [amount, setAmount] = useState<number>(100);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingCountry: ''
  });
  const handleSuccess = (details: any) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
    console.log("Transaction Details:", details);
    // Here, update backend with payment status
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
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de carte
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300"
                    placeholder="123"
                    value={formData.cvc}
                    onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom sur la carte
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="mt-6 text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <img 
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" 
                  alt="PayPal Checkout" 
                  className="h-10 mx-auto mb-3"
                />
                <p className="text-gray-600">
                  Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" 
                  alt="Accepted Cards" 
                  className="h-8"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
      >
        {paymentMethod === 'paypal' 
          ? <PayPalButton amount={amount} onSuccess={handleSuccess} />
          : paymentMethod === 'cash'
          ? `Payer l'acompte de ${depositAmount.toFixed(2)}€`
          : 'Procéder au paiement'
        }
      </button>
    </form>
  );
}