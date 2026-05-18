// src/app/(protected)/household-setup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { householdSchema } from '@/utils/validation';
import { householdAPI } from '@/api/household';

export default function HouseholdSetup(): React.ReactElement {
  const [serverError, setServerError] = useState<string>('');
  const router = useRouter();

  // Let react-hook-form implicitly infer types directly from the zodResolver structure
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(householdSchema),
    defaultValues: {
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      pincode: '',
      monthly_grocery_budget: '',
      prefer_organic: false,
    },
  });

  const onSubmit = async (data: any): Promise<void> => {
    setServerError('');
    try {
      await householdAPI.create(data);
      router.push('/add-family-member');
    } catch (err: any) {
      setServerError(err.detail || 'Failed to save household configuration.');
    }
  };

  return (
    <div className="form-container">
      <h1>Complete Your Profile</h1>
      <h2>Household Information</h2>

      {serverError && (
        <div className="error-message" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="address_line1">Address Line 1 *</label>
          <input
            id="address_line1"
            type="text"
            placeholder="123 Main Street"
            aria-invalid={errors.address_line1 ? 'true' : 'false'}
            {...register('address_line1')}
          />
          {errors.address_line1 && (
            <span className="inline-error" role="alert">
              {String(errors.address_line1.message)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address_line2">Address Line 2 (Optional)</label>
          <input
            id="address_line2"
            type="text"
            placeholder="Apt, Suite, Unit, etc."
            aria-invalid={errors.address_line2 ? 'true' : 'false'}
            {...register('address_line2')}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              type="text"
              placeholder="Bengaluru"
              aria-invalid={errors.city ? 'true' : 'false'}
              {...register('city')}
            />
            {errors.city && (
              <span className="inline-error" role="alert">
                {String(errors.city.message)}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <input
              id="state"
              type="text"
              placeholder="Karnataka"
              aria-invalid={errors.state ? 'true' : 'false'}
              {...register('state')}
            />
            {errors.state && (
              <span className="inline-error" role="alert">
                {String(errors.state.message)}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pincode">Pincode *</label>
          <input
            id="pincode"
            type="text"
            placeholder="560001"
            aria-invalid={errors.pincode ? 'true' : 'false'}
            {...register('pincode')}
          />
          {errors.pincode && (
            <span className="inline-error" role="alert">
              {String(errors.pincode.message)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="monthly_grocery_budget">Monthly Grocery Budget (₹)</label>
          <input
            id="monthly_grocery_budget"
            type="number"
            placeholder="10000"
            aria-invalid={errors.monthly_grocery_budget ? 'true' : 'false'}
            {...register('monthly_grocery_budget')}
          />
          {errors.monthly_grocery_budget && (
            <span className="inline-error" role="alert">
              {String(errors.monthly_grocery_budget.message)}
            </span>
          )}
        </div>

        <div className="form-group checkbox">
          <input
            id="prefer_organic"
            type="checkbox"
            {...register('prefer_organic')}
          />
          <label htmlFor="prefer_organic">I prefer organic products</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Saving Configuration...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
}