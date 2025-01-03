import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Nos coordonnées</h2>
        <p className="text-gray-600">
          N'hésitez pas à nous contacter pour toute question ou demande de devis personnalisé.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">WhatsApp</h3>
            <p className="text-gray-600 mb-2">
              Pour une réponse rapide, contactez-nous sur WhatsApp ! Nous sommes disponibles 24/7 et répondons généralement en moins de 5 minutes.
            </p>
            <a 
              href="https://wa.me/33666205982" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              Nous contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Phone className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Téléphone</h3>
            <p className="text-gray-600">
              <a href="tel:+33666205982" className="hover:text-primary-600">
                +33 6 66 20 59 82
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Mail className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:contact@privatechauffeur.fr" className="hover:text-primary-600">
                contact@privatechauffeur.fr
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <MapPin className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Adresse</h3>
            <p className="text-gray-600">
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Clock className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Horaires</h3>
            <p className="text-gray-600">
              Service disponible 24h/24, 7j/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}