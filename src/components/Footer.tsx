import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" onClick={handleLinkClick}>
              <img 
                src="https://res.cloudinary.com/dinbxrql6/image/upload/v1735443675/private-chauffeur-logo-6_1_sqtwmi.svg" 
                alt="Private Chauffeur Logo" 
                className="h-12 mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-sm mt-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services" 
                  className="hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('header.services')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/rates" 
                  className="hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('header.rates')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  {t('header.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:+33666205982" className="hover:text-white transition-colors">
                  +33 6 66 20 59 82
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:contact@privatechauffeur.fr" className="hover:text-white transition-colors">
                  contact@privatechauffeur.fr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-1" />
                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.followUs')}</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/1AG4bqsjbn/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/private.chauffeur_official/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Private Chauffeur. {t('footer.rights')}</p>
          <div className="mt-2 space-x-4">
            <Link 
              to="/privacy" 
              className="hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              {t('footer.privacy')}
            </Link>
            <span>•</span>
            <Link 
              to="/terms" 
              className="hover:text-white transition-colors"
              onClick={handleLinkClick}
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}