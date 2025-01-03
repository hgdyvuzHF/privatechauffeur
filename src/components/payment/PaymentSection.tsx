import React from 'react';
import { CreditCard, Truck } from 'lucide-react';
import PaymentSummary from './PaymentSummary';
import PaymentForm from './PaymentForm';
import TrustBadge from './TrustBadge';
import { Vehicle } from '../../data/vehicles';
import { getPrice } from '../../data/prices';
import { LuggageServiceData } from '../booking/LuggageService';

interface PaymentSectionProps {
  selectedVehicle: Vehicle;
  route: string;
  formData: any;
  luggageService?: LuggageServiceData;
  onPaymentSubmit: (paymentData: any) => void;
}

export default function PaymentSection({ 
  selectedVehicle, 
  route, 
  formData,
  luggageService,
  onPaymentSubmit 
}: PaymentSectionProps) {
  const price = getPrice(route, selectedVehicle.category);
  const totalPrice = luggageService?.enabled 
    ? price + luggageService.totalPrice 
    : price;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <PaymentForm 
          onSubmit={onPaymentSubmit}
          totalPrice={totalPrice}
        />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <PaymentSummary 
          price={price}
          vehicle={selectedVehicle}
          route={route}
          luggageService={luggageService}
        />
        <TrustBadge />
      </div>
    </div>
  );
}