export interface RoutePrice {
  standardDrive: number;
  greenDrive: number;
  eliteDrive: number;
  vipDrive: number;
  vanDrive: number;
}

export interface RoutePrices {
  [key: string]: RoutePrice;
}

export const prices: RoutePrices = {
  'CDG <=> Disney': {
    standardDrive: 99.00,
    greenDrive: 104.50,
    eliteDrive: 143.00,
    vipDrive: 187.00,
    vanDrive: 187.00
  },
  'Orly <=> Disney': {
    standardDrive: 110.00,
    greenDrive: 110.00,
    eliteDrive: 154.00,
    vipDrive: 209.00,
    vanDrive: 198.00
  },
  'Beauvais <=> Disney': {
    standardDrive: 264.00,
    greenDrive: 275.00,
    eliteDrive: 330.00,
    vipDrive: 352.00,
    vanDrive: 407.00
  },
  'Paris <=> Disney': {
    standardDrive: 110.00,
    greenDrive: 115.50,
    eliteDrive: 154.00,
    vipDrive: 209.00,
    vanDrive: 187.00
  },
  'CDG <=> Paris': {
    standardDrive: 82.50,
    greenDrive: 93.50,
    eliteDrive: 121.00,
    vipDrive: 176.00,
    vanDrive: 154.00
  },
  'Orly <=> Paris': {
    standardDrive: 66.00,
    greenDrive: 77.00,
    eliteDrive: 110.00,
    vipDrive: 143.00,
    vanDrive: 132.00
  },
  'Beauvais <=> Paris': {
    standardDrive: 187.00,
    greenDrive: 198.00,
    eliteDrive: 264.00,
    vipDrive: 341.00,
    vanDrive: 352.00
  },
  'Paris <=> Paris': {
    standardDrive: 55.00,
    greenDrive: 66.00,
    eliteDrive: 88.00,
    vipDrive: 132.00,
    vanDrive: 110.00
  },
  'CDG <=> Orly': {
    standardDrive: 110.00,
    greenDrive: 110.00,
    eliteDrive: 154.00,
    vipDrive: 209.00,
    vanDrive: 187.00
  }
};

export function getPrice(route: string, vehicleCategory: string): number {
  const routePrices = prices[route];
  if (!routePrices) {
    throw new Error(`No prices found for route: ${route}`);
  }

  const categoryKey = vehicleCategory.toLowerCase().replace(/drive/i, 'Drive') as keyof RoutePrice;
  const price = routePrices[categoryKey];
  
  if (typeof price !== 'number') {
    throw new Error(`No price found for category ${vehicleCategory} on route ${route}`);
  }

  return price;
}