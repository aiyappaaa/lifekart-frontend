// src/utils/formatters.ts

/**
 * Computes the financial projections of a subscription profile over its entire lifespan.
 */
export function calculateLifetimeCost(
  unitPrice: number,
  quantityPerDelivery: number,
  frequencyDays: number,
  startDate: Date,
  endDate: Date
): {
  perDelivery: number;
  perMonth: number;
  perYear: number;
  lifetime: number;
  totalDeliveries: number;
} {
  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalDeliveries = Math.floor(totalDays / frequencyDays);
  const perDelivery = unitPrice * quantityPerDelivery;
  const perYear = (365 / frequencyDays) * perDelivery;
  const perMonth = perYear / 12;
  const lifetime = totalDeliveries * perDelivery;

  return {
    perDelivery: Math.round(perDelivery * 100) / 100,
    perMonth: Math.round(perMonth * 100) / 100,
    perYear: Math.round(perYear * 100) / 100,
    lifetime: Math.round(lifetime * 100) / 100,
    totalDeliveries,
  };
}

/**
 * Calculates absolute and percentage savings of wholesale pricing models against standard retail.
 */
export function calculateSavings(
  wholesalePrice: number,
  retailPrice: number
): { amount: number; percentage: number } {
  const amount = retailPrice - wholesalePrice;
  const percentage = retailPrice > 0 ? Math.round((amount / retailPrice) * 100) : 0;
  return { amount, percentage };
}