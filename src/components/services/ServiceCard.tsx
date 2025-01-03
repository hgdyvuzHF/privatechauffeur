import React from 'react';
import { ServiceType } from '../../types/services';

export default function ServiceCard({ icon, title, description }: ServiceType) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}