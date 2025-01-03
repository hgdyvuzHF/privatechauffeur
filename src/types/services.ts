import { ReactNode } from 'react';

export interface ServiceType {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ServiceCategoryType {
  title: string;
  description: string;
  services: ServiceType[];
}