import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img 
              src="https://res.cloudinary.com/dinbxrql6/image/upload/v1735443675/private-chauffeur-logo-6_1_sqtwmi.svg" 
              alt="Private Chauffeur Logo" 
              className="h-12"
            />
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary-600">
                {t('navigation.home')}
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-600 hover:text-primary-600">
                {t('navigation.services')}
              </Link>
            </li>
            <li>
              <Link to="/guided-tours" className="text-gray-600 hover:text-primary-600">
                {t('navigation.guidedTours')}
              </Link>
            </li>
            <li>
              <Link to="/rates" className="text-gray-600 hover:text-primary-600">
                {t('navigation.rates')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-primary-600">
                {t('navigation.contact')}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}