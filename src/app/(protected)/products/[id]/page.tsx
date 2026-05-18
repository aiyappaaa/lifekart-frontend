// src/app/(protected)/products/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/api/products';
import { Product } from '@/types/product';
import { calculateSavings } from '@/utils/formatters';

// Mock database registry for localized route testing before data stream sync
const MOCK_PRODUCTS: Record<string, Product> = {
  'prod-1': { id: 'prod-1', category_id: 'cat-1', manufacturer_id: 'man-1', name: 'Premium Basmati Rice', sku: 'LKP-BR-01', image_url: null, unit_size: '5 kg', unit_price_wholesale: 450, unit_price_retail: 650, min_order_quantity: 1, max_order_quantity: 5, is_active: true },
  'prod-2': { id: 'prod-2', category_id: 'cat-2', manufacturer_id: 'man-2', name: 'Organic Whole Cow Milk', sku: 'LKP-OM-02', image_url: null, unit_size: '1 Liter', unit_price_wholesale: 48, unit_price_retail: 70, min_order_quantity: 2, max_order_quantity: 30, is_active: true },
};

export default function ProductDetail(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductSpecs(): Promise<void> {
      try {
        if (productId) {
          const apiProduct = await productsAPI.getById(productId);
          if (apiProduct) setProduct(apiProduct);
        }
      } catch (err) {
        // Fallback directly to system runtime model state if API layer is offline
        if (MOCK_PRODUCTS[productId]) {
          setProduct(MOCK_PRODUCTS[productId]);
        }
      } finally {
        setLoading(false);
      }
    }
    void fetchProductSpecs();
  }, [productId]);

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', fontWeight: 600 }} aria-live="polite">Compiling product specifications...</div>;
  }

  if (!product) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Product Specification Missing</h2>
        <p>The requested inventory signature could not be verified.</p>
        <Link href="/products" style={{ color: '#1890ff', textDecoration: 'underline' }}>Return to Hub</Link>
      </div>
    );
  }

  const { amount, percentage } = calculateSavings(product.unit_price_wholesale, product.unit_price_retail);

  const handleSubscribeRouting = (): void => {
    router.push(`/subscriptions/create?product_id=${product.id}`);
  };

  return (
    <div className="detail-container" style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Breadcrumb Navigation Schema */}
      <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '25px', color: '#8c8c8c', fontSize: '14px' }}>
        <Link href="/products" style={{ textDecoration: 'none', color: '#1890ff' }}>Wholesale Hub</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: '#595959', fontWeight: 500 }}>{product.name}</span>
      </nav>

      {/* Main Structural Specifications Node */}
      <div className="spec-card" style={{ display: 'flex', gap: '40px', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '40px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        
        {/* Visual Preview Frame */}
        <div className="spec-image-frame" style={{ width: '40%', minWidth: '300px', height: '350px', background: '#fafafa', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', border: '1px solid #f0f0f0' }}>
          📦
        </div>

        {/* Data Architecture Metric Frame */}
        <div className="spec-data" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: '#262626' }}>{product.name}</h1>
            <p style={{ color: '#8c8c8c', fontSize: '14px', margin: '0 0 24px 0' }}>Internal SKU: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>{product.sku}</code></p>
            
            <hr style={{ border: '0', borderTop: '1px solid #f0f0f0', margin: '20px 0' }} />

            {/* Pricing Model Evaluation Grid */}
            <div className="pricing-matrix" style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#8c8c8c', display: 'block', marginBottom: '4px' }}>Wholesale Price</span>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#52c41a' }}>Generic Unit: ₹{product.unit_price_wholesale}</span>
              </div>
              <div>
                <span style={{ fontSize: '13px', color: '#8c8c8c', display: 'block', marginBottom: '4px' }}>Standard Retail</span>
                <span style={{ fontSize: '20px', textDecoration: 'line-through', color: '#bfbfbf' }}>₹{product.unit_price_retail}</span>
              </div>
              <div style={{ background: '#feffe6', border: '1px solid #fffb8f', borderRadius: '4px', padding: '8px 12px' }}>
                <span style={{ color: '#ad8b00', fontSize: '13px', fontWeight: 600, display: 'block' }}>💥 Lifetime Wholesaler Advantage</span>
                <span style={{ color: '#e8b004', fontSize: '14px', fontWeight: 'bold' }}>Save ₹{amount} ({percentage}%) per unit size</span>
              </div>
            </div>

            {/* Allocation Boundary Specifications */}
            <div className="allocation-rules" style={{ background: '#fbfbfb', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#595959', marginBottom: '30px' }}>
              <p style={{ margin: '0 0 8px 0' }}>📦 <strong>Unit Size Configuration:</strong> {product.unit_size}</p>
              <p style={{ margin: '0 0 8px 0' }}>🛑 <strong>Minimum Allocation Threshold:</strong> {product.min_order_quantity} unit(s)</p>
              <p style={{ margin: '0' }}>🚀 <strong>Ceiling Allocation Cap:</strong> {product.max_order_quantity ? `${product.max_order_quantity} units max` : 'Unlimited supply allocations'}</p>
            </div>
          </div>

          {/* Action Trigger Component Execution Layer */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={handleSubscribeRouting} 
              className="btn-primary" 
              style={{ flexGrow: 1, padding: '16px 0', fontSize: '16px', fontWeight: 'bold', borderRadius: '6px', background: '#1890ff', color: '#fff', border: 'none', cursor: 'pointer', textAlign: 'center' }}
            >
              🔒 Subscribe for Life
            </button>
            <Link 
              href="/products" 
              style={{ width: '120px', padding: '16px 0', fontSize: '14px', fontWeight: 500, borderRadius: '6px', border: '1px solid #d9d9d9', color: '#595959', background: '#fff', textDecoration: 'none', textAlign: 'center' }}
            >
              Back
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}