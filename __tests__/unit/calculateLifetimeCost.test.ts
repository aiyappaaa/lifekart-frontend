// __tests__/unit/calculateLifetimeCost.test.ts
import { calculateLifetimeCost } from '@/utils/formatters';

describe('calculateLifetimeCost utility allocation algorithm', () => {
  it('calculates monthly subscription financial metrics correctly across timelines', () => {
    const start = new Date('2026-01-01');
    const end = new Date('2086-01-01'); // 60-year lifetime projection horizon
    
    const result = calculateLifetimeCost(100, 2, 30, start, end);
    
    expect(result.perDelivery).toBe(200);
    expect(result.perMonth).toBeCloseTo(202.77, 1);
    expect(result.totalDeliveries).toBe(730);
  });
});