import React from 'react';
import RatesTable from '../components/rates/RatesTable';
import RatesCategories from '../components/rates/RatesCategories';

export default function Rates() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Nos tarifs</h1>
          
          <div className="space-y-12">
            <RatesCategories />
            <RatesTable />
          </div>
        </div>
      </div>
    </div>
  );
}