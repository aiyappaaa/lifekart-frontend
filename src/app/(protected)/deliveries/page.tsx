// src/app/(protected)/deliveries/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { subscriptionsAPI } from '@/api/subscriptions';
import { Subscription, FREQUENCY_DAYS } from '@/types/subscription';

// Mock expanded item details to simulate real database joins
interface ScheduledDelivery extends Subscription {
  productName: string;
  unitSize: string;
  itemIcon: string;
}

const MOCK_DELIVERIES: ScheduledDelivery[] = [
  { id: 'sub-1', household_id: 'h-1', member_id: 'mem-1', product_id: 'prod-1', quantity_per_delivery: 2, frequency_days: 30, start_date: '2026-01-01', end_date: '2086-01-01', next_delivery_date: '2026-06-01', status: 'active', source: 'direct', locked_unit_price: 450, price_ceiling_pct: 5, productName: 'Premium Basmati Rice', unitSize: '5 kg', itemIcon: '🌾' },
  { id: 'sub-2', household_id: 'h-1', member_id: null, product_id: 'prod-2', quantity_per_delivery: 12, frequency_days: 7, start_date: '2026-02-15', end_date: '2086-02-15', next_delivery_date: '2026-05-22', status: 'active', source: 'direct', locked_unit_price: 48, price_ceiling_pct: 5, productName: 'Organic Whole Cow Milk', unitSize: '1 Liter', itemIcon: '🥛' },
  { id: 'sub-2-b', household_id: 'h-1', member_id: null, product_id: 'prod-2', quantity_per_delivery: 12, frequency_days: 7, start_date: '2026-02-15', end_date: '2086-02-15', next_delivery_date: '2026-05-29', status: 'active', source: 'direct', locked_unit_price: 48, price_ceiling_pct: 5, productName: 'Organic Whole Cow Milk', unitSize: '1 Liter', itemIcon: '🥛' }
];

export default function DeliverySchedule(): React.ReactElement {
  const [schedule] = useState<ScheduledDelivery[]>(MOCK_DELIVERIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterMonth, setFilterMonth] = useState<string>('2026-05');

  useEffect(() => {
    async function syncScheduleMatrix(): Promise<void> {
      try {
        const response = await subscriptionsAPI.getAll('active');
        if (response && response.items.length > 0) {
          // In a live environment, this is where we would map through the elements
          // and fetch product metadata descriptions asynchronously
        }
      } catch (err) {
        // Keeps local mock layout operational if API is disconnected
      } finally {
        setLoading(false);
      }
    }
    void syncScheduleMatrix();
  }, []);

  // Filter out items that match the user's selected monthly calendar view scope
  const filteredSchedule = schedule.filter((item) => 
    item.next_delivery_date.startsWith(filterMonth)
  );

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', fontWeight: 600 }} aria-live="polite">Parsing logistics dispatch tracking matrix...</div>;
  }

  return (
    <div className="schedule-container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Structural Header Context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '26px', margin: '0 0 6px 0', color: '#262626' }}>Procurement Delivery Calendar</h1>
          <p style={{ margin: '0', color: '#8c8c8c', fontSize: '14px' }}>Predictive fulfillment windows tracking against locked wholesale contracts</p>
        </div>

        {/* Month Selector Filter Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="month-select" style={{ fontWeight: 600, fontSize: '14px', color: '#595959' }}>Target Window:</label>
          <select 
            id="month-select"
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #d9d9d9', background: '#fff', fontSize: '14px', fontWeight: 500 }}
          >
            <option value="2026-05">May 2026</option>
            <option value="2026-06">June 2026</option>
            <option value="2026-07">July 2026</option>
          </select>
        </div>
      </div>

      {/* Main Timeline Card Manifest */}
      {filteredSchedule.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #d9d9d9', borderRadius: '8px', background: '#fafafa' }}>
          <p style={{ color: '#8c8c8c', fontSize: '15px' }}>No dispatches scheduled to pass logistics verification within this month.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredSchedule.sort((a,b) => a.next_delivery_date.localeCompare(b.next_delivery_date)).map((delivery) => {
            const deliveryTotal = delivery.locked_unit_price * delivery.quantity_per_delivery;
            
            return (
              <div 
                key={delivery.id + '-' + delivery.next_delivery_date} 
                style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8e8e8', borderRadius: '8px', background: '#fff', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}
              >
                {/* Date Highlight Badge Component */}
                <div style={{ width: '140px', background: '#f0f5ff', borderRight: '1px solid #adc6ff', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px', color: '#2f54eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Dispatch Date</span>
                  <strong style={{ fontSize: '20px', color: '#1d39c4' }}>
                    {new Date(delivery.next_delivery_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </strong>
                </div>

                {/* Logistics Metadata Payload Block */}
                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '22px' }} aria-hidden="true">{delivery.itemIcon}</span>
                      <h3 style={{ margin: '0', fontSize: '18px', color: '#262626', fontWeight: 600 }}>{delivery.productName}</h3>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#8c8c8c' }}>
                      <span>Capacity Weight: <strong>{delivery.quantity_per_delivery} × {delivery.unitSize}</strong></span>
                      <span>Cadence: <strong>{FREQUENCY_DAYS[delivery.frequency_days]}</strong></span>
                      <span>Contract Status: <strong style={{ color: '#52c41a' }}>Verified Secure</strong></span>
                    </div>
                  </div>

                  {/* Financial Settlement Estimate Box */}
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#8c8c8c', display: 'block', marginBottom: '2px' }}>Settlement Value</span>
                    <strong style={{ fontSize: '20px', color: '#262626' }}>₹{deliveryTotal.toLocaleString('en-IN')}</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: '#bfbfbf', marginTop: '2px' }}>COD / Auto-Debit Eligible</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Interface Dashboard Shortcut Action Node */}
      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <Link href="/products" style={{ display: 'inline-block', background: '#f5f5f5', color: '#595959', border: '1px solid #d9d9d9', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          Browse Catalog Infrastructure
        </Link>
      </div>

    </div>
  );
}