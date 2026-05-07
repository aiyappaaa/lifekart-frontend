// src/app/signup/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '../../api/auth';

export default function Signup() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Call backend signup API
      await signup({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Redirect to login
      router.push('/login?message=Signup successful! Please login.');
    } catch (err: any) {
      setError(err.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🛒 LifeKart</h1>
        <h2>Create Account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="At least 8 characters"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}