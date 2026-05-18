// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchema } from '@/utils/validation';
import { authAPI } from '@/api/auth';

export default function Signup(): React.ReactElement {
  const [serverError, setServerError] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema): Promise<void> => {
    setServerError('');
    try {
      // Destructure to remove confirm_password before posting to the FastAPI backend
      const { confirm_password, ...signupData } = data; 
      await authAPI.signup(signupData);
      router.push('/login?message=Signup successful! Please login.');
    } catch (err: any) {
      setServerError(err.detail || 'Signup failed. Email might already be registered.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🛒 LifeKart</h1>
        <h2>Create Account</h2>

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
              placeholder="Aiyappa B P"
              aria-invalid={errors.full_name ? 'true' : 'false'}
              {...register('full_name')}
            />
            {errors.full_name && (
              <span className="inline-error" role="alert">
                {errors.full_name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email')}
            />
            {errors.email && (
              <span className="inline-error" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="9876543210"
              aria-invalid={errors.phone ? 'true' : 'false'}
              {...register('phone')}
            />
            {errors.phone && (
              <span className="inline-error" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password')}
            />
            {errors.password && (
              <span className="inline-error" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password *</label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm your password"
              aria-invalid={errors.confirm_password ? 'true' : 'false'}
              {...register('confirm_password')}
            />
            {errors.confirm_password && (
              <span className="inline-error" role="alert">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}