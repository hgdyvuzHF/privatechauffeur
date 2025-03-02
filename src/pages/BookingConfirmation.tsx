import React, { useEffect, useState } from 'react';
import { Check, Calendar, Clock, Users, AlertCircle, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate, formatTime } from '../utils/dateFormatter';
import { sendBookingConfirmation } from '../services/email';
import type { EmailStatus } from '../types/booking';
import { submitGlobalBooking } from '../utils/globalBooking';

interface BookingConfirmationProps {
  booking: {
    route: string;
    tripType: string;
    date: string;
    time: string;
    returnDate?: string;
    returnTime?: string;
    passengers: string;
    firstName: string;
    lastName: string;
    email: string;
    vehicle: {
      category: string;
      name: string;
    };
  };
  onBack: () => void;
}

export default function BookingConfirmation({ booking, onBack }: BookingConfirmationProps) {
  const [emailStatus, setEmailStatus] = useState<EmailStatus>({ success: true });
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Load saved vehicle list from localStorage or set default
  const getInitialVehicle = () => {
    const savedVehicle = localStorage.getItem('SelectedVehicle');
    return savedVehicle ? JSON.parse(savedVehicle) : booking.vehicle;
  };

  const [vehicle, setVehicle] = useState(getInitialVehicle);

  useEffect(() => {
    localStorage.setItem('SelectedVehicle', JSON.stringify(vehicle));
  }, [vehicle]);

  useEffect(() => {
    const sendEmail = async () => {
      const status = await sendBookingConfirmation({
        customerName: `${booking.firstName} ${booking.lastName}`,
        customerEmail: booking.email,
        route: booking.route,
        date: formatDate(booking.date),
        time: formatTime(booking.time),
        returnDate: booking.returnDate ? formatDate(booking.returnDate) : undefined,
        returnTime: booking.returnTime ? formatTime(booking.returnTime) : undefined,
        passengers: parseInt(booking.passengers),
        vehicle: vehicle
      });
      setEmailStatus(status);
    };
    sendEmail();
    submitGlobalBooking();
    navigate("/thank-you");
  }, [booking, vehicle]);

  const handleBack = () => {
    localStorage.setItem('SelectedVehicle', JSON.stringify(vehicle));
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('booking.confirmation.title')}
            </h1>
            {emailStatus.error ? (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-700">{emailStatus.error}</p>
              </div>
            ) : (
              <p className="text-gray-600">{t('booking.confirmation.emailSent')}</p>
            )}
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">{t('vehicle.selected')}</h3>
              <p className="text-gray-600">{vehicle.name}</p>
              <p className="text-sm text-gray-500">{vehicle.category}</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t">
            <button 
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>{t('booking.confirmation.backToHome')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
