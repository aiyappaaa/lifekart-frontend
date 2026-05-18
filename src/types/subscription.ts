export type SubscriptionStatus = 'active' | 'paused' | 'completed' | 'cancelled';
export type SubscriptionSource = 'direct' | 'gift' | 'corporate' | 'community';

export const FREQUENCY_DAYS = {
  7: 'Weekly',
  14: 'Bi-weekly',
  30: 'Monthly',
  90: 'Quarterly',
  365: 'Yearly',
} as const;

export type FrequencyDays = keyof typeof FREQUENCY_DAYS;

export interface Subscription {
  id: string;
  household_id: string;
  member_id: string | null;
  product_id: string;
  quantity_per_delivery: number;
  frequency_days: FrequencyDays;
  start_date: string;
  end_date: string;
  next_delivery_date: string;
  status: SubscriptionStatus;
  source: SubscriptionSource;
  locked_unit_price: number;
  price_ceiling_pct: number;
}

export interface CreateSubscriptionRequest {
  product_id: string;
  member_id?: string;
  quantity_per_delivery: number;
  frequency_days: FrequencyDays;
  start_date: string;
  end_date: string;
}