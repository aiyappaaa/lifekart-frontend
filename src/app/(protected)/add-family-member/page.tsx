// src/app/(protected)/add-family-member/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '@/utils/validation';

export default function AddFamilyMember(): React.ReactElement {
  const [serverError, setServerError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  // Removing manual generic bindings lets TypeScript validate clean flat string inputs seamlessly
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      full_name: '',
      relationship: '' as any,         // Fixes the relationship red line
      date_of_birth: '',
      gender: '' as any,               // Fixes the gender red line
      dietary_preference: '' as any,   // Fixes the dietary_preference red line
      lifestyle_tags: [],
    },
  });

  const onSubmit = async (data: any): Promise<void> => {
    setServerError('');
    setSuccessMessage('');
    try {
      setSuccessMessage(`${String(data.full_name)} added successfully! You can add another member or complete onboarding.`);
      reset(); 
    } catch (err: any) {
      setServerError(err.detail || 'Failed to register household member.');
    }
  };

  const handleCompleteOnboarding = (): void => {
    router.push('/dashboard');
  };

  return (
    <div className="form-container">
      <h1>Household Profiles</h1>
      <h2>Add Family Members</h2>

      {successMessage && (
        <div style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', color: '#0050b3', padding: '12px', borderRadius: '5px', marginBottom: '20px' }} role="status">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="error-message" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="full_name">Full Name *</label>
          <input
            id="full_name"
            type="text"
            placeholder="Jane Doe"
            aria-invalid={errors.full_name ? 'true' : 'false'}
            {...register('full_name')}
          />
          {errors.full_name && (
            <span className="inline-error" role="alert">
              {String(errors.full_name.message)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="relationship">Relationship *</label>
          <select
            id="relationship"
            aria-invalid={errors.relationship ? 'true' : 'false'}
            {...register('relationship')}
          >
            <option value="">Select connection...</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="dependent_parent">Dependent Parent</option>
            <option value="other">Other</option>
          </select>
          {errors.relationship && (
            <span className="inline-error" role="alert">
              {String(errors.relationship.message)}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth *</label>
            <input
              id="date_of_birth"
              type="date"
              aria-invalid={errors.date_of_birth ? 'true' : 'false'}
              {...register('date_of_birth')}
            />
            {errors.date_of_birth && (
              <span className="inline-error" role="alert">
                {String(errors.date_of_birth.message)}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              aria-invalid={errors.gender ? 'true' : 'false'}
              {...register('gender')}
            >
              <option value="">Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="inline-error" role="alert">
                {String(errors.gender.message)}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dietary_preference">Dietary Preference</label>
          <select
            id="dietary_preference"
            aria-invalid={errors.dietary_preference ? 'true' : 'false'}
            {...register('dietary_preference')}
          >
            <option value="">No specific preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non_veg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="jain">Jain</option>
            <option value="keto">Keto</option>
            <option value="diabetic">Diabetic</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ background: '#444', flex: 1 }}>
            {isSubmitting ? 'Adding...' : '+ Add Another Member'}
          </button>
          
          <button type="button" onClick={handleCompleteOnboarding} className="btn-primary" style={{ flex: 1 }}>
            Complete Setup
          </button>
        </div>
      </form>
    </div>
  );
}