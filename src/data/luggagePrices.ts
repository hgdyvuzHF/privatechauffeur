export interface LuggagePrices {
  standard: Record<number, number>;
  special: Record<number, number>;
}

export const luggagePrices: LuggagePrices = {
  standard: {
    1: 100,
    2: 120,
    3: 140,
    4: 160,
    5: 180,
    6: 200,
    7: 220,
    8: 240,
    9: 260,
    10: 280
  },
  special: {
    1: 180,
    2: 250,
    3: 320
  }
};

export function calculateLuggagePrice(standardCount: number, specialCount: number): number {
  let totalPrice = 0;

  // Calculate standard luggage price
  if (standardCount > 0) {
    totalPrice += luggagePrices.standard[standardCount] || 0;
  }

  // Calculate special luggage price
  if (specialCount > 0) {
    totalPrice += luggagePrices.special[specialCount] || 0;
  }

  return totalPrice;
}