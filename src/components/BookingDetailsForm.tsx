import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfPassengers: string;
  numberOfBags: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupInstructions: string;
  dropoffInstructions: string;
  flightNumber: string;
  specialRequests: string;
  acceptTerms: boolean;
}

interface BookingDetailsFormProps {
  formData: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isValid: boolean;
}

export default function BookingDetailsForm({
  formData,
  onChange,
  onSubmit,
  onBack,
  isValid
}: BookingDetailsFormProps) {
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('BookingDetailsForm', JSON.stringify(formData));
  }, [formData]);
  

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h3 className="text-xl font-semibold mb-4">{t('booking.title')}</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.numberOfPassengers')} <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
              value={formData.numberOfPassengers}
              onChange={(e) => onChange({ numberOfPassengers: e.target.value })}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {t('booking.passengers', { count: i + 1 })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.numberOfBags')} <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
              value={formData.numberOfBags}
              onChange={(e) => onChange({ numberOfBags: e.target.value })}
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.pickupAddress')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            value={formData.pickupAddress}
            onChange={(e) => onChange({ pickupAddress: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.pickupInstructions')}
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            rows={2}
            value={formData.pickupInstructions}
            onChange={(e) => onChange({ pickupInstructions: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.dropoffAddress')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            value={formData.dropoffAddress}
            onChange={(e) => onChange({ dropoffAddress: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.dropoffInstructions')}
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            rows={2}
            value={formData.dropoffInstructions}
            onChange={(e) => onChange({ dropoffInstructions: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.flightNumber')}
          </label>
          <input
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            value={formData.flightNumber}
            onChange={(e) => onChange({ flightNumber: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.firstName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
              value={formData.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('form.lastName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
              value={formData.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            value={formData.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.specialRequests')}
          </label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-600 focus:ring focus:ring-primary-200"
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => onChange({ specialRequests: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            checked={formData.acceptTerms}
            onChange={(e) => onChange({ acceptTerms: e.target.checked })}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            {t('form.terms')}
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50"
        >
          {t('form.back')}
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('form.confirm')}
        </button>
      </div>
    </form>
  );

}