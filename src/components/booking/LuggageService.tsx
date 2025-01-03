import React, { useState, useEffect } from 'react';
import { Luggage, Plus, Minus, Euro, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { calculateLuggagePrice } from '../../data/luggagePrices';

interface LuggageServiceProps {
  onUpdate: (data: LuggageServiceData) => void;
}

export interface LuggageServiceData {
  enabled: boolean;
  standardLuggage: number;
  specialLuggage: number;
  specialLuggageDetails?: string;
  totalPrice: number;
}

export default function LuggageService({ onUpdate }: LuggageServiceProps) {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [standardLuggage, setStandardLuggage] = useState(0);
  const [specialLuggage, setSpecialLuggage] = useState(0);
  const [specialLuggageDetails, setSpecialLuggageDetails] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const price = calculateLuggagePrice(standardLuggage, specialLuggage);
    setTotalPrice(price);
  }, [standardLuggage, specialLuggage]);

  const handleToggle = (enabled: boolean) => {
    setIsEnabled(enabled);
    if (!enabled) {
      setStandardLuggage(0);
      setSpecialLuggage(0);
      setSpecialLuggageDetails('');
      setIsAdded(false);
    }
  };

  const handleAddService = () => {
    setIsAdded(true);
    onUpdate({
      enabled: true,
      standardLuggage,
      specialLuggage,
      specialLuggageDetails,
      totalPrice
    });
  };

  const updateCount = (type: 'standard' | 'special', increment: boolean) => {
    if (type === 'standard') {
      const maxStandard = 10;
      const newCount = increment 
        ? Math.min(standardLuggage + 1, maxStandard)
        : Math.max(0, standardLuggage - 1);
      setStandardLuggage(newCount);
      setIsAdded(false);
    } else {
      const maxSpecial = 3;
      const newCount = increment
        ? Math.min(specialLuggage + 1, maxSpecial)
        : Math.max(0, specialLuggage - 1);
      setSpecialLuggage(newCount);
      setIsAdded(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 mt-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Luggage className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Service de bagages
            </h3>
            {isEnabled && totalPrice > 0 && (
              <div className="flex items-center gap-2 text-primary-600 font-semibold">
                <Euro className="h-5 w-5" />
                <span>{totalPrice.toFixed(2)}</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Notre service prend en charge vos bagages dès votre arrivée à l'aéroport jusqu'à votre chauffeur, 
            vous permettant de voyager l'esprit tranquille.
          </p>
          
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleToggle(true)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                isEnabled
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-300 text-gray-600 hover:border-primary-600'
              }`}
            >
              Oui, je souhaite ce service
            </button>
            <button
              type="button"
              onClick={() => handleToggle(false)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                !isEnabled
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-300 text-gray-600 hover:border-primary-600'
              }`}
            >
              Non merci
            </button>
          </div>

          {isEnabled && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bagages standards (max. 10)
                  </label>
                  {standardLuggage > 0 && (
                    <span className="text-sm text-primary-600 font-medium">
                      {calculateLuggagePrice(standardLuggage, 0)}€
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCount('standard', false)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {standardLuggage}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount('standard', true)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    disabled={standardLuggage >= 10}
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bagages spéciaux - dimensions hors normes (max. 3)
                  </label>
                  {specialLuggage > 0 && (
                    <span className="text-sm text-primary-600 font-medium">
                      {calculateLuggagePrice(0, specialLuggage)}€
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <button
                    type="button"
                    onClick={() => updateCount('special', false)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {specialLuggage}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCount('special', true)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    disabled={specialLuggage >= 3}
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {specialLuggage > 0 && (
                  <textarea
                    placeholder="Décrivez vos bagages spéciaux (dimensions, poids...)"
                    className="w-full px-3 py-2 border rounded-md"
                    value={specialLuggageDetails}
                    onChange={(e) => {
                      setSpecialLuggageDetails(e.target.value);
                      setIsAdded(false);
                    }}
                    rows={3}
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="bg-primary-50 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2 text-primary-600">
                    <span className="font-medium">Total service bagages:</span>
                    <span className="text-lg font-semibold">{totalPrice.toFixed(2)}€</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddService}
                  disabled={isAdded || (standardLuggage === 0 && specialLuggage === 0)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium
                    transition-all duration-200
                    ${isAdded 
                      ? 'bg-green-50 text-green-600 border-2 border-green-600'
                      : 'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Service ajouté
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Ajouter au total
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}