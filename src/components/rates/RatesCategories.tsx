import React from 'react';
import { Car, Leaf, Star, Crown, Users } from 'lucide-react';

const categories = [
  {
    icon: <Car className="h-6 w-6 text-primary-600" />,
    name: 'StandardDrive',
    description: 'Véhicules standards offrant un excellent rapport qualité-prix, parfaits pour les trajets quotidiens et professionnels.',
    examples: 'Toyota CHR, Corolla Touring'
  },
  {
    icon: <Leaf className="h-6 w-6 text-primary-600" />,
    name: 'GreenDrive',
    description: 'Véhicules 100% électriques alliant performance et respect de l\'environnement.',
    examples: 'Tesla Model 3, Y, Hyundai IONIQ'
  },
  {
    icon: <Star className="h-6 w-6 text-primary-600" />,
    name: 'EliteDrive',
    description: 'Véhicules premium combinant luxe et technologie, idéaux pour les déplacements d\'affaires.',
    examples: 'Mercedes Classe C, E, Tesla Model S'
  },
  {
    icon: <Crown className="h-6 w-6 text-primary-600" />,
    name: 'VipDrive',
    description: 'L\'excellence du transport VIP avec des véhicules haut de gamme offrant un confort exceptionnel.',
    examples: 'Mercedes Classe S, Tesla Model X'
  },
  {
    icon: <Users className="h-6 w-6 text-primary-600" />,
    name: 'VanDrive',
    description: 'Véhicules spacieux et confortables, parfaits pour les groupes et les familles.',
    examples: 'Mercedes Classe V, Vito, Caravelle'
  }
];

export default function RatesCategories() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.name} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
          <p className="text-gray-600 mb-3">
            {category.description}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Véhicules :</span> {category.examples}
          </p>
        </div>
      ))}
    </div>
  );
}