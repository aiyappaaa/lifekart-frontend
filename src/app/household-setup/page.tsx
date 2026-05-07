// src/app/household-setup/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createHousehold } from '../../api/household';
import useAuthStore from '../../store/authStore';

export default function HouseholdSetup() {
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    lat: null,
    lng: null,
    monthly_grocery_budget: '',
    prefer_organic: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call backend API
      await createHousehold(formData);
      
      // Since Phase 2 isn't built yet, we'll just show an alert or redirect to a placeholder
      alert("Household created successfully! Moving to Phase 2 next.");
      // router.push('/dashboard'); // We will build this in Phase 2
    } catch (err: any) {
      setError(err.detail || 'Failed to save household. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Complete Your Profile</h1>
      <h2>Household Information</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Address Line 1 *</label>
          <input
            type="text"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleChange}
            required
            placeholder="123 Main Street"
          />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input
            type="text"
            name="address_line2"
            value={formData.address_line2}
            onChange={handleChange}
            placeholder="Apt, Suite, etc (optional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Bangalore"
            />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="Karnataka"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            placeholder="560001"
          />
        </div>

        <div className="form-group">
          <label>Monthly Grocery Budget (₹)</label>
          <input
            type="number"
            name="monthly_grocery_budget"
            value={formData.monthly_grocery_budget}
            onChange={handleChange}
            placeholder="10000"
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="prefer_organic"
            checked={formData.prefer_organic}
            onChange={handleChange}
            id="organic"
          />
          <label htmlFor="organic">I prefer organic products</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
}