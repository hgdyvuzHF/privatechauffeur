import React from 'react';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import { useParallax } from '../hooks/useParallax';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  onBookingSubmit: (bookingData: any) => void;
}

export default function Hero({ onBookingSubmit }: HeroProps) {
  const parallaxOffset = useParallax();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: 'url("https://res.cloudinary.com/dinbxrql6/image/upload/v1735443253/DALL_E_2024-12-29_04.34.00_-_A_wide_elegant_landscape-style_parallax_background_image_for_a_luxury_chauffeur_service_website._The_scene_features_a_professionally_dressed_chauffeu_jb7jlv.webp")',
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 pt-32 pb-16 flex items-center min-h-screen">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">
              {t('hero.title', 'Votre Chauffeur Privé de Confiance')}
            </h1>
            <p className="text-xl mb-8">
              {t('hero.description', 'Service premium de transport avec chauffeur disponible 24/7. Confort, ponctualité et professionnalisme garantis.')}
            </p>
            <div className="flex space-x-4">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition">
                {t('header.book')}
              </button>
              <Link 
                to="/services" 
                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition"
              >
                {t('header.services')}
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BookingForm onSubmit={onBookingSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}