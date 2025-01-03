import React from 'react';
import { prices } from '../../data/prices';

type PriceCategory = 'standardDrive' | 'greenDrive' | 'eliteDrive' | 'vipDrive' | 'vanDrive';

const categoryMapping: Record<string, PriceCategory> = {
  'StandardDrive': 'standardDrive',
  'GreenDrive': 'greenDrive',
  'EliteDrive': 'eliteDrive',
  'VipDrive': 'vipDrive',
  'VanDrive': 'vanDrive'
};

export default function RatesTable() {
  const routes = Object.keys(prices);
  const categories = ['StandardDrive', 'GreenDrive', 'EliteDrive', 'VipDrive', 'VanDrive'];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trajet
              </th>
              {categories.map((category) => (
                <th key={category} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {category}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map((route) => (
              <tr key={route} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {route}
                </td>
                {categories.map((category) => {
                  const mappedCategory = categoryMapping[category];
                  const price = prices[route][mappedCategory];
                  return (
                    <td key={category} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {price.toFixed(2)} €
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}