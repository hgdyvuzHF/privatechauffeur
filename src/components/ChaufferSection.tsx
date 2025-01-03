import React from 'react';
import { Shield, Clock, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6 text-primary-600" />,
    title: "Chauffeurs certifiés",
    description: "Tous nos chauffeurs sont professionnels et rigoureusement sélectionnés"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary-600" />,
    title: "Disponible 24/7",
    description: "Service disponible à toute heure, tous les jours de la semaine"
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-primary-600" />,
    title: "Service premium",
    description: "Une expérience de transport haut de gamme personnalisée"
  }
];

export default function ChauffeurSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="relative h-[600px] rounded-lg overflow-hidden"
            style={{
              backgroundImage: 'url("https://res.cloudinary.com/dinbxrql6/image/upload/v1735443254/DALL_E_2024-12-29_04.32.06_-_A_luxurious_parallax-style_background_image_designed_for_a_private_chauffeur_website._The_scene_features_a_well-dressed_chauffeur_in_a_tailored_suit_s_gfxpii.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Une équipe de chauffeurs d'excellence
              </h2>
              <p className="text-lg text-gray-600">
                Nos chauffeurs professionnels sont à votre service pour vous offrir 
                une expérience de transport exceptionnelle, alliant confort, 
                sécurité et ponctualité.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}