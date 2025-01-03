import React from 'react';
import ServiceCategory from '../components/services/ServiceCategory';
import { serviceCategories } from '../data/services';

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez notre gamme complète de services de transport haut de gamme
          </p>
          
          <div className="space-y-16">
            {serviceCategories.map((category, index) => (
              <ServiceCategory key={index} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}