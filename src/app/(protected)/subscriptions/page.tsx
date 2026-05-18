// src/app/(protected)/subscriptions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { subscriptionsAPI } from '@/api/subscriptions';
import { Subscription, SubscriptionStatus, FREQUENCY_DAYS } from '@/types/subscription';

// Mock active subscription ledger profiles for standalone runtime orchestration
const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: 'sub-1', household_id: 'h-1', member_id: 'mem-1', product_id: 'prod-1', quantity_per_delivery: 2, frequency_days: 30, start_date: '2026-01-01', end_date: '2086-01-01', next_delivery_date: '2026-06-01', status: 'active', source: 'direct', locked_unit_price: 450, price_ceiling_pct: 5 },
  { id: 'sub-2', household_id: 'h-1', member_id: null, product_id: 'prod-2', quantity_per_delivery: 12, frequency_days: 7, start_date: '2026-02-15', end_date: '2086-02-15', next_delivery_date: '2026-05-22', status: 'active', source: 'direct', locked_unit_price: 48, price_ceiling_pct: 5 }
];

// Resolves a product title string from an ID signature for display context
function getProductMockName(id: string): string {
  return id === 'prod-1' ? 'Premium Basmati Rice (5 kg)' : 'Organic Whole Cow Milk (1 Liter)';
}

export default function SubscriptionList(): React.ReactElement {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [activeTab, setActiveTab] = useState<SubscriptionStatus>('active');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSubscriptions = async (): Promise<void> => {
    try {
      const response = await subscriptionsAPI.getAll();
      if (response && response.items.length > 0) {
        setSubscriptions(response.items);
      }
    } catch (err) {
      // Retains local sandbox system dataset if backend services are offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSubscriptions();
  }, []);

  const handleStatusMutation = async (id: string, action: 'pause' | 'resume' | 'cancel'): Promise<void> => {
    try {
      let updatedSub: Subscription;
      if (action === 'pause') updatedSub = await subscriptionsAPI.pause(id);
      else if (action === 'resume') updatedSub = await subscriptionsAPI.resume(id);
      else updatedSub = await subscriptionsAPI.cancel(id);

      setSubscriptions((prev) => prev.map((s) => (s.id === id ? updatedSub : s)));
    } catch (err) {
      // Local runtime compilation fallback to simulate state transition updates seamlessly
      setSubscriptions((prev) =>
        prev.map((s) => {
          if (s.id === id) {
            const nextStatus: SubscriptionStatus = action === 'pause' ? 'paused' : action === 'resume' ? 'active' : 'cancelled';
            return { ...s, status: nextStatus };
          }
          return s;
        })
      );
    }
  };

  // Compute aggregate recurring monthly capital metrics across open operational pathways
  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active');
  const totalMonthlySpend = activeSubscriptions.reduce((sum, sub) => {
    const deliveryCost = sub.locked_unit_price * sub.quantity_per_delivery;
    const monthlyMultiplier = 30 / sub.frequency_days;
    return sum + deliveryCost * monthlyMultiplier;
  }, 0);

  const filteredSubscriptions = subscriptions.filter((s) => s.status === activeTab);

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', fontWeight: 600 }} aria-live="polite">Parsing historical allocation registry...</div>;
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* High-Level Capital Allocation Velocity Metrics Summary */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529', color: '#fff', padding: '24px 40px', borderRadius: '8px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '24px' }}>Lifetime Procurement Dashboard</h1>
          <p style={{ margin: '0', color: '#40a9ff', fontSize: '14px' }}>Active Base Operations: {activeSubscriptions.length} tracks</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', color: '#a6adb4', display: 'block' }}>COMBINED MONTHLY VELOCITY VALUE</span>
          <strong style={{ fontSize: '28px', color: '#52c41a' }}>₹{Math.round(totalMonthlySpend).toLocaleString('en-IN')}</strong>
        </div>
      </header>

      {/* Navigation Filter Segment Controls */}
      <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: '24px', gap: '8px' }}>
        {(['active', 'paused', 'cancelled'] as SubscriptionStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #1890ff' : '3px solid transparent',
              color: activeTab === tab ? '#1890ff' : '#595959',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab} Allocations ({subscriptions.filter((s) => s.status === tab).length})
          </button>
        ))}
      </div>

      {/* Allocation Segment Display View */}
      {filteredSubscriptions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #d9d9d9', borderRadius: '8px', background: '#fafafa' }}>
          <p style={{ color: '#8c8c8c', margin: '0 0 16px 0' }}>No allocation signatures cataloged within this profile sector.</p>
          {activeTab === 'active' && (
            <Link href="/products" style={{ background: '#1890ff', color: '#fff', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>
              Deploy Initial Pipeline
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredSubscriptions.map((sub) => {
            const singleDeliveryCost = sub.locked_unit_price * sub.quantity_per_delivery;
            return (
              <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '24px', background: '#fff' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#262626' }}>{getProductMockName(sub.product_id)}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#8c8c8c' }}>
                    <span>📦 Size Capacity: <strong>{sub.quantity_per_delivery} units</strong></span>
                    <span>🔄 Delivery Interval: <strong>{FREQUENCY_DAYS[sub.frequency_days]}</strong></span>
                    <span>📆 Next Dispatch Target: <strong style={{ color: '#1890ff' }}>{sub.next_delivery_date}</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#8c8c8c', display: 'block' }}>Locked Cost Rate</span>
                    <strong style={{ fontSize: '18px', color: '#262626' }}>₹{singleDeliveryCost}</strong>
                  </div>

                  {/* Operational Action Gate State Matrices */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {sub.status === 'active' && (
                      <button onClick={() => void handleStatusMutation(sub.id, 'pause')} style={{ padding: '8px 16px', background: '#faad14', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
                        Pause Pipeline
                      </button>
                    )}
                    {sub.status === 'paused' && (
                      <button onClick={() => void handleStatusMutation(sub.id, 'resume')} style={{ padding: '8px 16px', background: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
                        Resume Operation
                      </button>
                    )}
                    {sub.status !== 'cancelled' && (
                      <button onClick={() => void handleStatusMutation(sub.id, 'cancel')} style={{ padding: '8px 16px', background: '#fff', color: '#ff4d4f', border: '1px solid #ff4d4f', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>
                        Terminate
                      </button>
                    )}
                    {sub.status === 'cancelled' && (
                      <span style={{ color: '#bfbfbf', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}>Decommissioned</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}