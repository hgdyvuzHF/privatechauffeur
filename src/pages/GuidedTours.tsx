import React from 'react';
import { Clock, Users, Camera, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const tours = [
  {
    id: 'paris-disney',
    translationKey: 'parisDisney',
    duration: '5h',
    priceSmall: 395,
    priceLarge: 425,
    features: ['vehicle', 'pickup', 'itinerary', 'photoStops'],
    notIncluded: ['guide', 'entries']
  },
  {
    id: 'paris-versailles',
    translationKey: 'parisVersailles',
    duration: '8h',
    priceSmall: 540,
    priceLarge: 580,
    features: ['vehicle', 'pickup', 'itinerary', 'photoStops'],
    notIncluded: ['guide', 'castleEntry']
  },
  {
    id: 'paris-classic',
    translationKey: 'parisClassic',
    duration: '5h',
    priceSmall: 395,
    priceLarge: 425,
    features: ['vehicle', 'pickup', 'itinerary', 'photoStops'],
    notIncluded: ['guide', 'entries']
  },
  {
    id: 'paris-express',
    translationKey: 'parisExpress',
    duration: '3h',
    priceSmall: 280,
    priceLarge: 295,
    features: ['vehicle', 'pickup', 'itinerary', 'photoStops'],
    notIncluded: ['guide', 'entries']
  }
];

export default function GuidedTours() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('guidedTours.pageTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12">
              {t('guidedTours.pageSubtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {t(`guidedTours.tours.${tour.translationKey}.title`)}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          1-8 {t('guidedTours.passengers')}
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-right bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-lg">
                      <div className="text-sm text-gray-600">{t('guidedTours.startingFrom')}</div>
                      <div className="text-2xl md:text-3xl font-bold text-primary-600">{tour.priceSmall}€</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {t(`guidedTours.tours.${tour.translationKey}.description`)}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t('guidedTours.included')}</h3>
                      <ul className="space-y-2">
                        {tour.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Camera className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm md:text-base">{t(`guidedTours.features.${feature}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t('guidedTours.notIncluded')}</h3>
                      <ul className="space-y-2">
                        {tour.notIncluded.map((item) => (
                          <li key={item} className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm md:text-base">{t(`guidedTours.exclusions.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="space-y-2 w-full md:w-auto">
                        <div className="flex items-center justify-between md:justify-start gap-2">
                          <span className="text-gray-600">1-3 {t('guidedTours.passengers')}:</span>
                          <span className="font-semibold">{tour.priceSmall}€</span>
                        </div>
                        <div className="flex items-center justify-between md:justify-start gap-2">
                          <span className="text-gray-600">4-8 {t('guidedTours.passengers')}:</span>
                          <span className="font-semibold">{tour.priceLarge}€</span>
                        </div>
                      </div>
                      <button className="w-full md:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition">
                        {t('guidedTours.bookNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}