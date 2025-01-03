import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RouteOptionProps {
  route: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function RouteOption({ route, selected, onClick }: RouteOptionProps) {
  const [from, to] = route.split(' <=> ');

  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out
        ${selected 
          ? 'bg-primary-50 border-2 border-primary-600' 
          : 'bg-white border border-gray-200 hover:border-primary-600'
        }
      `}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{from}</p>
      </div>
      
      <div className="mx-4 flex-shrink-0">
        <ArrowRight 
          className={`h-6 w-6 ${selected ? 'text-primary-600' : 'text-gray-400'}`}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate text-right">{to}</p>
      </div>
    </div>
  );
}