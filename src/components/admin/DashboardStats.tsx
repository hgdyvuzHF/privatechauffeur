import React from 'react';
import { TrendingUp, Users, Calendar, CreditCard } from 'lucide-react';

const stats = [
  {
    icon: <Calendar className="h-6 w-6 text-primary-600" />,
    label: 'Réservations du jour',
    value: '12'
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    label: 'Nouveaux clients',
    value: '48'
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    label: 'Taux de conversion',
    value: '8.5%'
  },
  {
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    label: 'Revenu mensuel',
    value: '14 520€'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gray-50">
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}