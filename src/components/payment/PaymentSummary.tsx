import React from 'react';
import { Vehicle } from '../../data/vehicles';
import { LuggageServiceData } from '../booking/LuggageService';

interface PaymentSummaryProps {
  price: number;
  vehicle: Vehicle;
  route: string;
  luggageService?: LuggageServiceData;
}

export default function PaymentSummary({ price, vehicle, route, luggageService }: PaymentSummaryProps) {
  const totalPrice = luggageService?.enabled 
    ? price + luggageService.totalPrice 
    : price;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Récapitulatif</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600">Trajet</div>
          <div className="font-medium">{route}</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Véhicule</div>
          <div className="font-medium">{vehicle.name}</div>
          <div className="text-sm text-gray-500">{vehicle.category}</div>
        </div>

        {luggageService?.enabled && (
          <div>
            <div className="text-sm text-gray-600">Service bagages</div>
            <div className="space-y-1">
              {luggageService.standardLuggage > 0 && (
                <div className="flex justify-between">
                  <span>{luggageService.standardLuggage} bagage{luggageService.standardLuggage > 1 ? 's' : ''} standard{luggageService.standardLuggage > 1 ? 's' : ''}</span>
                </div>
              )}
              {luggageService.specialLuggage > 0 && (
                <div className="flex justify-between">
                  <span>{luggageService.specialLuggage} bagage{luggageService.specialLuggage > 1 ? 's' : ''} spécia{luggageService.specialLuggage > 1 ? 'ux' : 'l'}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Prix du trajet</span>
            <span className="font-medium">{price.toFixed(2)}€</span>
          </div>
          {luggageService?.enabled && (
            <div className="flex justify-between mt-2">
              <span>Service bagages</span>
              <span className="font-medium">{luggageService.totalPrice.toFixed(2)}€</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Frais de service</span>
            <span>Inclus</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}