import React, { useState } from 'react';
import { Users, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { vehicles, Vehicle } from '../data/vehicles';
import { getPrice } from '../data/prices';
import BookingDetailsForm from '../components/booking/BookingDetailsForm';
import LuggageService, { LuggageServiceData } from '../components/booking/LuggageService';
import PaymentSection from '../components/payment/PaymentSection';

interface VehicleSelectionProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  route?: string;
}

export default function VehicleSelection({ onSubmit, onBack, route = 'CDG <=> Paris' }: VehicleSelectionProps) {
  const { t } = useTranslation();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    numberOfPassengers: '1',
    numberOfBags: '0',
    pickupAddress: '',
    pickupInstructions: '',
    dropoffAddress: '',
    dropoffInstructions: '',
    flightNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    acceptTerms: false
  });
  const [luggageService, setLuggageService] = useState<LuggageServiceData>({
    enabled: false,
    standardLuggage: 0,
    specialLuggage: 0,
    totalPrice: 0
  });

  const handleBookingDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVehicle) {
      setShowPayment(true);
    }
  };

  const handlePaymentSubmit = (paymentData: any) => {
    onSubmit({
      ...bookingDetails,
      vehicle: selectedVehicle,
      luggageService,
      payment: paymentData
    });
  };

  const handleBookingDetailsChange = (updates: Partial<typeof bookingDetails>) => {
    setBookingDetails(prev => ({ ...prev, ...updates }));
  };

  if (showPayment && selectedVehicle) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentSection
            selectedVehicle={selectedVehicle}
            route={route}
            formData={bookingDetails}
            luggageService={luggageService}
            onPaymentSubmit={handlePaymentSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('vehicle.title')}</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Véhicules */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{t('vehicle.ourVehicles')}</h3>
            {vehicles.map((vehicle) => {
              const price = getPrice(route, vehicle.category);
              return (
                <div
                  key={vehicle.id}
                  className={`p-6 bg-white rounded-lg shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                    selectedVehicle?.id === vehicle.id ? 'ring-2 ring-primary-600' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex gap-6">
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-32 h-24 object-contain rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{vehicle.category}</h3>
                          <p className="text-gray-600">{vehicle.name}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {price.toFixed(2)}€
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-2">{vehicle.description}</p>
                      
                      <div className="flex gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span>{vehicle.capacity} {t('booking.passengers', { count: vehicle.capacity })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                          <span>{vehicle.luggage} {t('vehicle.luggage')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Formulaire de réservation */}
          <div className="space-y-6">
            <BookingDetailsForm
              formData={bookingDetails}
              onChange={handleBookingDetailsChange}
              onSubmit={handleBookingDetailsSubmit}
              onBack={onBack}
              isValid={!!selectedVehicle}
            />
            <LuggageService onUpdate={setLuggageService} />
          </div>
        </div>
      </div>
    </div>
  );
}