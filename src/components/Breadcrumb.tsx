import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

interface BreadcrumbProps {
  steps: Step[];
}

export default function Breadcrumb({ steps }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <li>
                  <div
                    className={`flex items-center ${
                      step.onClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={step.onClick}
                  >
                    <span
                      className={`flex items-center ${
                        step.isActive
                          ? 'text-primary-600 font-semibold'
                          : step.isCompleted
                          ? 'text-gray-600 hover:text-primary-600'
                          : 'text-gray-400'
                      }`}
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full mr-2 text-sm border">
                        {index + 1}
                      </span>
                      {step.label}
                    </span>
                  </div>
                </li>
                {index < steps.length - 1 && (
                  <li className="text-gray-300">
                    <ChevronRight className="h-5 w-5" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}