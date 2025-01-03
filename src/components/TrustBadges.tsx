import React from 'react';
import { Shield, Award, Clock, ThumbsUp } from 'lucide-react';

const badges = [
  {
    icon: <Shield className="h-12 w-12 text-primary-600" />,
    title: "Service Vérifié",
    description: "Chauffeurs certifiés et assurés"
  },
  {
    icon: <Award className="h-12 w-12 text-primary-600" />,
    title: "Excellence",
    description: "Note moyenne de 4.9/5"
  },
  {
    icon: <Clock className="h-12 w-12 text-primary-600" />,
    title: "Ponctualité",
    description: "98% de courses à l'heure"
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-primary-600" />,
    title: "Satisfaction",
    description: "+10 000 clients satisfaits"
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
                {badge.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}