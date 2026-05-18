// src/app/(protected)/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Fixed: Correct Next.js linking routing path
import { productsAPI } from '@/api/products';
import { Product, ProductCategory } from '@/types/product';
import { calculateSavings } from '@/utils/formatters';

// Simple mock catalog dataset to ensure immediate interface usability before database population
const MOCK_CATEGORIES: ProductCategory[] = [
  { id: 'cat-1', name: 'Staples & Grains', slug: 'staples', icon: '🌾', unit_type: 'kg', avg_lifetime_consumption_per_year: 120 },
  { id: 'cat-2', name: 'Dairy & Dairy Products', slug: 'dairy', icon: '🥛', unit_type: 'liter', avg_lifetime_consumption_per_year: 180 },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-1', category_id: 'cat-1', manufacturer_id: 'man-1', name: 'Premium Basmati Rice', sku: 'LKP-BR-01', image_url: null, unit_size: '5 kg', unit_price_wholesale: 450, unit_price_retail: 650, min_order_quantity: 1, max_order_quantity: 5, is_active: true },
  { id: 'prod-2', category_id: 'cat-2', manufacturer_id: 'man-2', name: 'Organic Whole Cow Milk', sku: 'LKP-OM-02', image_url: null, unit_size: '1 Liter', unit_price_wholesale: 48, unit_price_retail: 70, min_order_quantity: 2, max_order_quantity: 30, is_active: true },
];

export default function ProductCatalog(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<ProductCategory[]>(MOCK_CATEGORIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    async function initCatalog(): Promise<void> {
      try {
        const [prodData, catData] = await Promise.all([
          productsAPI.getAll(),
          productsAPI.getCategories()
        ]);
        if (prodData && prodData.items.length > 0) setProducts(prodData.items);
        if (catData && catData.length > 0) setCategories(catData);
      } catch (err) {
        // Safe runtime exception fallback to system mock models
      } finally {
        // Simulate a tiny intentional network lag to test skeleton animations
        setTimeout(() => setLoading(false), 400);
      }
    }
    void initCatalog();
  }, []);

  // Compute reactive runtime sorting arrays based on client-side state parameters
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? p.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-container" style={{ display: 'flex', gap: '30px', padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Search & Filter Controls Panel */}
      <aside className="filter-sidebar" style={{ width: '280px', flexShrink: 0, borderRight: '1px solid #eee', paddingRight: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Filters</h3>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="search-input" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Search Inventory</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-select" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Category Select</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">All Core Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Product Iteration View Grid Matrix */}
      <main className="catalog-content" style={{ flexGrow: 1 }}>
        <h2 style={{ marginBottom: '25px' }}>Wholesale Product Hub</h2>

        {loading ? (
          <div className="skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {[1, 2].map((n) => (
              <div key={n} style={{ height: '320px', background: '#f5f5f5', borderRadius: '8px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state" role="status" style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
            <p style={{ fontSize: '18px' }}>No products found matching your current filtering arguments.</p>
          </div>
        ) : (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredProducts.map((product) => {
              const { percentage } = calculateSavings(product.unit_price_wholesale, product.unit_price_retail);
              return (
                <div key={product.id} className="product-card" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#52c41a', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                    Save {percentage}%
                  </span>
                  
                  <div>
                    <div style={{ width: '100%', height: '160px', background: '#fafafa', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '12px' }}>
                      📦
                    </div>
                    <h3 style={{ fontSize: '16px', margin: '0 0 6px 0' }}>{product.name}</h3>
                    <p style={{ color: '#8c8c8c', fontSize: '13px', margin: '0 0 12px 0' }}>SKU: {product.sku} | Size: {product.unit_size}</p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>₹{product.unit_price_wholesale}</span>
                      <span style={{ textDecoration: 'line-through', color: '#bfbfbf', fontSize: '14px' }}>₹{product.unit_price_retail}</span>
                    </div>
                    
                    {/* Fixed: Transformed to native next/link tracking component and removed textAlignment typo */}
                    <Link href={`/products/${product.id}`} style={{ display: 'block', background: '#1890ff', color: '#fff', padding: '10px 0', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, textAlign: 'center' }}>
                      Analyze Specifications
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Global Embedded Stylesheet for Compilation Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}