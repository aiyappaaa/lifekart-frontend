// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../api/auth';
import useAuthStore from '../../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call backend login API
      const response = await login({ email, password });
      
      // Save token and user info
      setToken(response.access_token);
      setUser(response.user);
      
      // Redirect to next step
      router.push('/role-selection');
    } catch (err: any) {
      setError(err.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🛒 LifeKart</h1>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}