// src/app/(protected)/subscriptions/create/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { productsAPI } from '@/api/products';
import { householdAPI } from '@/api/household';
import { subscriptionsAPI } from '@/api/subscriptions';
import { Product } from '@/types/product';
import { Member } from '@/types/household';
import { calculateLifetimeCost } from '@/utils/formatters';

// Fallback configuration definitions for decoupled sandboxed runtime preview execution
const DEFAULT_PRODUCT: Product = {
  id: 'prod-1',
  category_id: 'cat-1',
  manufacturer_id: 'man-1',
  name: 'Premium Basmati Rice',
  sku: 'LKP-BR-01',
  image_url: null,
  unit_size: '5 kg',
  unit_price_wholesale: 450,
  unit_price_retail: 650,
  min_order_quantity: 1,
  max_order_quantity: 5,
  is_active: true,
};

const MOCK_MEMBERS: Member[] = [
  { id: 'mem-1', household_id: 'h-1', full_name: 'Aiyappa (Self)', relationship: 'self', date_of_birth: '2000-01-01', gender: 'male', dietary_preference: 'non_veg', lifestyle_tags: [], is_active: true },
];

function SubscriptionCreateFormCore(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams?.get('product_id') || '';

  const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [serverError, setServerError] = useState<string>('');

  // Auto-calculate exact 60-year operational horizons 
  const getTodayString = (): string => new Date().toISOString().split('T')[0];
  const getSixtyYearsOutString = (): string => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 60);
    return d.toISOString().split('T')[0];
  };

  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      product_id: productId,
      member_id: '',
      quantity_per_delivery: 1,
      frequency_days: 30,
      start_date: getTodayString(),
      end_date: getSixtyYearsOutString(),
    },
  });

  // Watch key execution parameters reactively to generate fluid real-time cost updates
  const watchedQuantity = Number(watch('quantity_per_delivery') || 1);
  const watchedFrequency = Number(watch('frequency_days') || 30);
  const watchedStart = watch('start_date');
  const watchedEnd = watch('end_date');

  useEffect(() => {
    async function streamFormContext(): Promise<void> {
      try {
        if (productId) {
          const apiProd = await productsAPI.getById(productId);
          if (apiProd) setProduct(apiProd);
        }
        // Attempts to extract the active household identifier context
        const userMembers = await householdAPI.getMembers('active_session');
        if (userMembers && userMembers.length > 0) setMembers(userMembers);
      } catch (err) {
        // Soft fallback mechanism defaults cleanly to predefined models
      }
    }
    void streamFormContext();
  }, [productId]);

  // Execute reactive mapping matrix calculations
  const costProjections = calculateLifetimeCost(
    product.unit_price_wholesale,
    watchedQuantity,
    watchedFrequency,
    new Date(watchedStart || getTodayString()),
    new Date(watchedEnd || getSixtyYearsOutString())
  );

  const onSubmit = async (data: any): Promise<void> => {
    setServerError('');
    try {
      await subscriptionsAPI.create({
        product_id: product.id,
        member_id: data.member_id || undefined,
        quantity_per_delivery: Number(data.quantity_per_delivery),
        frequency_days: Number(data.frequency_days) as any,
        start_date: data.start_date,
        end_date: data.end_date,
      });
      router.push('/subscriptions');
    } catch (err: any) {
      setServerError(err.detail || 'Failed to initialize lifetime wholesale allocation signature.');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h1>Establish Wholesale Allocation</h1>
      <h2 style={{ marginBottom: '30px' }}>Product: {product.name} ({product.unit_size})</h2>

      {serverError && <div className="error-message" role="alert">{serverError}</div>}

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        {/* Form Controls Processing Matrix */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ flexGrow: 1, background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="member_id">Assign Target Beneficiary</label>
            <select id="member_id" {...register('member_id')} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">Entire Household Unit</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.full_name}</option>
              ))}
            </select>
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="quantity_per_delivery">Quantity Per Delivery</label>
              <input
                id="quantity_per_delivery"
                type="number"
                min={product.min_order_quantity}
                max={product.max_order_quantity || 100}
                {...register('quantity_per_delivery')}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <span style={{ fontSize: '12px', color: '#8c8c8c' }}>Min: {product.min_order_quantity}</span>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="frequency_days">Delivery Frequency Cycle</label>
              <select id="frequency_days" {...register('frequency_days')} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value={7}>Weekly Rotation</option>
                <option value={14}>Bi-Weekly Rotation</option>
                <option value={30}>Monthly Rotation</option>
                <option value={90}>Quarterly Rotation</option>
                <option value={365}>Yearly Rotation</option>
              </select>
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="start_date">Activation Start Date</label>
              <input id="start_date" type="date" {...register('start_date')} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="end_date">Lifecycle Expiration Date</label>
              <input id="end_date" type="date" {...register('end_date')} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', background: '#52c41a' }}>
            {isSubmitting ? 'Securing Allocation Vault...' : '🔒 Lock Price & Activate'}
          </button>
        </form>

        {/* Real-time Financial Ledger Evaluation Widget */}
        <aside style={{ width: '320px', background: '#fafafa', padding: '24px', borderRadius: '8px', border: '1px solid #e8e8e8' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Ledger Estimator</h3>
          <span style={{ background: '#e6f7ff', color: '#1890ff', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Price Vault Locked</span>
          
          <hr style={{ border: '0', borderTop: '1px solid #e8e8e8', margin: '16px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#8c8c8c', display: 'block' }}>Cost Per Single Delivery</span>
              <strong style={{ fontSize: '20px', color: '#262626' }}>₹{costProjections.perDelivery}</strong>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#8c8c8c', display: 'block' }}>Estimated Monthly Velocity</span>
              <strong style={{ fontSize: '16px', color: '#262626' }}>₹{costProjections.perMonth} / mo</strong>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#8c8c8c', display: 'block' }}>Annualized Procurement Value</span>
              <strong style={{ fontSize: '16px', color: '#262626' }}>₹{costProjections.perYear} / yr</strong>
            </div>
            
            <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: '12px', borderRadius: '4px', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', color: '#52c41a', display: 'block', fontWeight: 600 }}>Total Life Allocation Value</span>
              <strong style={{ fontSize: '24px', color: '#52c41a' }}>₹{costProjections.lifetime}</strong>
              <small style={{ display: 'block', color: '#73d13d', fontSize: '12px', marginTop: '4px' }}>Spans {costProjections.totalDeliveries} iterative shipments</small>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Next.js App Router demands search parameter lookups be wrapped inside a Suspense boundary frame
export default function SubscriptionCreateForm(): React.ReactElement {
  return (
    <Suspense fallback={<div style={{ padding: '50px', textAlign: 'center', fontWeight: 600 }}>Loading parameters...</div>}>
      <SubscriptionCreateFormCore />
    </Suspense>
  );
}