import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings } from 'lucide-react';

const menuItems = [
  { icon: <LayoutDashboard />, label: 'Tableau de bord', path: '/admin/dashboard' },
  { icon: <Calendar />, label: 'Réservations', path: '/admin/bookings' },
  { icon: <Users />, label: 'Clients', path: '/admin/customers' },
  { icon: <Settings />, label: 'Paramètres', path: '/admin/settings' },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg
                  ${isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}