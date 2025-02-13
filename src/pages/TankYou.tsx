import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Home } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Merci pour votre réservation !
            </h1>
            <p className="text-gray-600">
              Un email de confirmation vous a été envoyé avec tous les détails de votre réservation.
            </p>
          </div>

          <div className="text-center">
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}