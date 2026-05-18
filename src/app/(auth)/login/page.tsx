// src/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/utils/validation';
import { authAPI } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export default function Login(): React.ReactElement {
  const [serverError, setServerError] = useState<string>('');
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  // Initialize react-hook-form with our Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema): Promise<void> => {
    setServerError('');
    try {
      const response = await authAPI.login(data);
      setToken(response.access_token);
      setUser(response.user);
      router.push('/role-selection');
    } catch (err: any) {
      setServerError(err.detail || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🛒 LifeKart</h1>
        <h2>Login</h2>

        {serverError && (
          <div className="error-message" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password')}
            />
            {errors.password && (
              <span className="inline-error" role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}