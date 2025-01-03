import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    author: "Sophie Martin",
    rating: 5,
    text: "Service exceptionnel ! Notre chauffeur était d'une grande courtoisie et très professionnel. La Mercedes Classe S était impeccable et le trajet très confortable. Je recommande vivement pour les transferts aéroport.",
    date: "2024-01-15"
  },
  {
    author: "Laurent Dubois",
    rating: 5,
    text: "Excellent service pour nos déplacements professionnels. Chauffeurs toujours ponctuels et véhicules haut de gamme. Le service client est très réactif sur WhatsApp. Une valeur sûre !",
    date: "2024-01-10"
  },
  {
    author: "Marie Lefevre",
    rating: 5,
    text: "Utilisation régulière pour mes trajets Paris-Disney. Service fiable, chauffeurs professionnels et prix très compétitifs. La réservation via WhatsApp est super pratique !",
    date: "2024-01-05"
  }
];

export default function GoogleReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Avis Google</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold">5.0</span>
            <span className="text-gray-600 ml-2">(117 avis vérifiés)</span>
          </div>
          <a
            href="https://shorturl.at/CVPwk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Voir tous les avis sur Google
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {review.author[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.author}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.text}</p>
              <time className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}