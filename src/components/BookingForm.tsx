import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { predefinedRoutes } from '../data/routes';

interface BookingFormProps {
  onSubmit: (bookingData: any) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    route: '',
    tripType: 'one-way',
    date: '',
    time: '12:00',
    returnDate: '',
    returnTime: '12:00',
    passengers: '1'
  });
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleRouteSelect = (route: string) => {
    setFormData({ ...formData, route });
    setIsRouteDropdownOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('booking.title')}</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('booking.selectRoute')}
          </label>
          <div 
            className="relative cursor-pointer"
            onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
          >
            <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between">
              {formData.route ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <span>{formData.route.split(' <=> ')[0]}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary-600 mx-2" />
                  <span>{formData.route.split(' <=> ')[1]}</span>
                </div>
              ) : (
                <span className="text-gray-500">{t('booking.selectRoute')}</span>
              )}
            </div>

            {isRouteDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {predefinedRoutes.map((route) => (
                  <div
                    key={route}
                    className={`
                      px-4 py-3 cursor-pointer hover:bg-gray-50
                      ${formData.route === route ? 'bg-primary-50' : ''}
                      border-b last:border-b-0 border-gray-100
                    `}
                    onClick={() => handleRouteSelect(route)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-5 w-5 ${formData.route === route ? 'text-primary-600' : 'text-gray-400'}`} />
                        <span>{route.split(' <=> ')[0]}</span>
                      </div>
                      <ArrowRight className={`h-5 w-5 mx-2 ${formData.route === route ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span>{route.split(' <=> ')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rest of the form remains unchanged */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`py-2 px-4 rounded-lg border ${
              formData.tripType === 'one-way'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
            }`}
            onClick={() => setFormData({...formData, tripType: 'one-way'})}
          >
            {t('booking.oneWay')}
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-lg border ${
              formData.tripType === 'round-trip'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
            }`}
            onClick={() => setFormData({...formData, tripType: 'round-trip'})}
          >
            {t('booking.roundTrip')}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="time"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
        </div>

        {formData.tripType === 'round-trip' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.returnDate}
                onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                required
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                value={formData.returnTime}
                onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                required
              />
            </div>
          </div>
        )}

        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          value={formData.passengers}
          onChange={(e) => setFormData({...formData, passengers: e.target.value})}
          required
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {t('booking.passengers', { count: i + 1 })}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
        >
          {t('header.book')}
        </button>
      </div>
    </form>
  );
}