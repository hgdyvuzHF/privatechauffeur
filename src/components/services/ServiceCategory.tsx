import React from 'react';
import ServiceCard from './ServiceCard';
import { ServiceCategoryType } from '../../types/services';

export default function ServiceCategory({ title, description, services }: ServiceCategoryType) {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}