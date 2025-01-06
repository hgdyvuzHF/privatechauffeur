import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://res.cloudinary.com/dinbxrql6/image/upload/v1735443675/private-chauffeur-logo-6_1_sqtwmi.svg" 
              alt="Private Chauffeur Logo" 
              className="h-12 brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary-600 transition-colors">
              {t('navigation.home')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-primary-600 transition-colors">
                {t('navigation.services')}
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                <Link 
                  to="/guided-tours" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {t('navigation.guidedTours')}
                </Link>
                <Link 
                  to="/rates" 
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {t('navigation.rates')}
                </Link>
              </div>
            </div>

            <Link to="/contact" className="text-white hover:text-primary-600 transition-colors">
              {t('navigation.contact')}
            </Link>

            <LanguageSwitcher />
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button 
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-white hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            
            <div className="space-y-2 pl-4 border-l border-gray-700">
              <Link 
                to="/guided-tours" 
                className="block text-white hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.guidedTours')}
              </Link>
              <Link 
                to="/rates" 
                className="block text-white hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.rates')}
              </Link>
            </div>

            <Link 
              to="/contact" 
              className="block text-white hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.contact')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}