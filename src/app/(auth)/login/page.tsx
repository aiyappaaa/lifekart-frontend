'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage(): React.ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push('/subscriptions'), 900);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #07090f;
        }

        .lk-page {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ── Left panel ── */
        .lk-left {
          width: 46%;
          min-width: 420px;
          background: #07090f;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 52px 60px;
          overflow: hidden;
        }

        /* Aurora blobs */
        .aurora { position: absolute; inset: 0; pointer-events: none; }
        .a1 {
          position: absolute; border-radius: 50%;
          width: 480px; height: 480px;
          background: radial-gradient(ellipse, rgba(112,64,238,0.55) 0%, transparent 70%);
          top: -100px; left: -80px;
          animation: drift1 14s ease-in-out infinite;
        }
        .a2 {
          position: absolute; border-radius: 50%;
          width: 380px; height: 380px;
          background: radial-gradient(ellipse, rgba(34,197,220,0.38) 0%, transparent 70%);
          top: 120px; right: -60px;
          animation: drift2 18s ease-in-out infinite;
        }
        .a3 {
          position: absolute; border-radius: 50%;
          width: 320px; height: 320px;
          background: radial-gradient(ellipse, rgba(236,72,153,0.28) 0%, transparent 70%);
          bottom: -70px; left: 80px;
          animation: drift3 22s ease-in-out infinite;
        }
        .a4 {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center bottom, rgba(7,9,15,0.9) 0%, transparent 70%);
        }

        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(28px,18px) scale(1.08)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-18px,28px) scale(0.92)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-22px) scale(1.06)} }

        /* Grain texture overlay */
        .grain {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* Logo row */
        .lk-logo-row {
          position: relative; z-index: 5;
          display: flex; align-items: center; gap: 11px;
          margin-bottom: auto;
          animation: fadeUp 0.8s ease both;
        }
        .lk-icon-wrap {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.08);
          border: 0.5px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px);
        }
        .lk-icon-wrap span { font-size: 20px; line-height: 1; }
        .lk-brand {
          font-family: 'Sora', sans-serif;
          font-size: 24px; font-weight: 700;
          color: #ffffff; letter-spacing: -0.5px;
        }

        /* Left body copy */
        .lk-left-body { position: relative; z-index: 5; }
        .lk-tagline {
          font-family: 'Sora', sans-serif;
          font-size: 32px; font-weight: 700;
          color: #fff; line-height: 1.26;
          letter-spacing: -0.8px;
          margin: 0 0 14px;
          animation: fadeUp 0.8s ease 0.1s both;
        }
        .lk-tagline-gradient {
          background: linear-gradient(90deg, #a78bfa, #67e8f9, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lk-sub {
          font-size: 14px; color: rgba(255,255,255,0.42);
          line-height: 1.65; margin: 0 0 28px; font-weight: 300;
          animation: fadeUp 0.8s ease 0.2s both;
        }
        .lk-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
          animation: fadeUp 0.8s ease 0.3s both;
        }
        .lk-pill {
          padding: 5px 13px; border-radius: 100px;
          border: 0.5px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.055);
          font-size: 11px; color: rgba(255,255,255,0.5);
          letter-spacing: 0.3px;
          backdrop-filter: blur(8px);
          display: flex; align-items: center; gap: 5px;
        }
        .lk-pill-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(167,139,250,0.7);
        }

        /* ── Right panel ── */
        .lk-right {
          flex: 1;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 60px;
          position: relative;
        }
        .lk-right::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse at 30% 0%, rgba(139,92,246,0.055) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 100%, rgba(34,211,238,0.04) 0%, transparent 50%);
        }

        .lk-form-wrap {
          width: 100%; max-width: 360px;
          position: relative; z-index: 1;
        }

        /* Form header */
        .lk-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 100px;
          background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(34,211,238,0.07));
          border: 0.5px solid rgba(139,92,246,0.22);
          font-size: 11px; color: #7c3aed; font-weight: 600;
          letter-spacing: 0.4px; text-transform: uppercase;
          margin-bottom: 18px;
          animation: fadeUp 0.7s ease 0.1s both;
        }
        .lk-title {
          font-family: 'Sora', sans-serif;
          font-size: 28px; font-weight: 700;
          color: #0f172a; letter-spacing: -0.7px;
          margin: 0 0 6px;
          animation: fadeUp 0.7s ease 0.15s both;
        }
        .lk-form-sub {
          font-size: 14px; color: #94a3b8;
          font-weight: 400; margin: 0 0 32px;
          animation: fadeUp 0.7s ease 0.2s both;
        }

        /* Fields */
        .lk-field { margin-bottom: 18px; animation: fadeUp 0.7s ease both; }
        .lk-field:nth-child(1) { animation-delay: 0.25s; }
        .lk-field:nth-child(2) { animation-delay: 0.3s; }

        .lk-field label {
          display: block;
          font-size: 11px; font-weight: 600;
          color: #334155; letter-spacing: 0.5px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .lk-input-wrap { position: relative; }
        .lk-input-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          font-size: 16px; color: #94a3b8;
          pointer-events: none;
          transition: color 0.2s;
        }
        .lk-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px; color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          background: #fafbfc;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .lk-input::placeholder { color: #94a3b8; }
        .lk-input:hover { border-color: #c8d2e0; background: #f8fafc; }
        .lk-input:focus {
          border-color: #8b5cf6; background: #fff;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
        }
        .lk-input:focus ~ .lk-input-icon { color: #8b5cf6; }

        /* Options row */
        .lk-options {
          display: flex; justify-content: space-between; align-items: center;
          margin: 6px 0 24px;
          animation: fadeUp 0.7s ease 0.35s both;
        }
        .lk-remember {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: #64748b; cursor: pointer;
        }
        .lk-remember input[type="checkbox"] {
          width: 15px; height: 15px;
          accent-color: #8b5cf6; cursor: pointer;
        }
        .lk-forgot {
          font-size: 13px; color: #8b5cf6; font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        .lk-forgot:hover { color: #6d28d9; }

        /* Primary CTA */
        .lk-btn {
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: #fff; border: none; border-radius: 10px;
          font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.2px;
          position: relative; overflow: hidden;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.2s;
          box-shadow: 0 4px 18px rgba(109,40,217,0.38), 0 1px 4px rgba(109,40,217,0.2);
          animation: fadeUp 0.7s ease 0.4s both;
        }
        .lk-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(109,40,217,0.45), 0 2px 8px rgba(109,40,217,0.25);
        }
        .lk-btn:active:not(:disabled) { transform: translateY(0); }
        .lk-btn:disabled { opacity: 0.85; cursor: not-allowed; }
        .lk-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          animation: shimmer 2.4s ease infinite;
        }
        @keyframes shimmer { 0%{left:-100%} 100%{left:210%} }

        /* Divider */
        .lk-sep {
          display: flex; align-items: center; gap: 14px;
          margin: 22px 0;
          animation: fadeUp 0.7s ease 0.45s both;
        }
        .lk-sep-line { flex: 1; height: 0.5px; background: #e2e8f0; }
        .lk-sep-txt { font-size: 11px; color: #cbd5e1; font-weight: 600; letter-spacing: 0.6px; }

        /* SSO button */
        .lk-sso {
          width: 100%; padding: 12px 20px;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px; color: #475569;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; font-weight: 500;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
          animation: fadeUp 0.7s ease 0.5s both;
        }
        .lk-sso:hover {
          border-color: #c4b5fd; background: #faf5ff; color: #4f46e5;
        }

        /* Footer */
        .lk-footer {
          text-align: center; margin-top: 22px;
          font-size: 13px; color: #94a3b8;
          animation: fadeUp 0.7s ease 0.55s both;
        }
        .lk-footer a { color: #140733; font-weight: 500; text-decoration: none; }
        .lk-footer a:hover { color: #6d28d9; }

        /* Trust bar */ 
        .lk-trust {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          margin-top: 20px; padding-top: 20px;
          border-top: 0.5px solid #f1f5f9;
          animation: fadeUp 0.7s ease 0.6s both;
        }
        .lk-trust-icon { font-size: 13px; color: #10b981; }
        .lk-trust-txt { font-size: 11px; color: #94a3b8; letter-spacing: 0.3px; }

        /* Shared animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .lk-page { flex-direction: column; }
          .lk-left { width: 100%; min-width: unset; min-height: 260px; padding: 40px 32px; }
          .lk-right { padding: 40px 24px; }
          .lk-logo-row { margin-bottom: 32px; }
        }

        @media (max-width: 480px) {
          .lk-left { padding: 32px 20px; }
          .lk-right { padding: 32px 16px; }
          .lk-tagline { font-size: 26px; }
          .lk-title { font-size: 24px; }
          .lk-form-wrap { max-width: 100%; }
        }
      `}</style>

      <div className="lk-page">

        {/* ── Left: Brand + Aurora ── */}
        <div className="lk-left">
          <div className="aurora">
            <div className="a1" />
            <div className="a2" />
            <div className="a3" />
            <div className="a4" />
          </div>
          <div className="grain" />

          <div className="lk-logo-row">
            <div className="lk-icon-wrap"><span aria-hidden="true">🛒</span></div>
            <span className="lk-brand">LifeKart</span>
          </div>

          <div className="lk-left-body">
            <h1 className="lk-tagline">
              Procurement that<br />
              <span className="lk-tagline-gradient">moves at scale</span>
            </h1>
            <p className="lk-sub">
              Enterprise-grade wholesale procurement and automated subscription
              infrastructure for modern operations teams.
            </p>
            <div className="lk-pills">
              {['SOC 2 Type II', '256-bit AES', '99.99% uptime', '12,000+ teams'].map(label => (
                <span key={label} className="lk-pill">
                  <span className="lk-pill-dot" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Login Form ── */}
        <div className="lk-right">
          <div className="lk-form-wrap">
            <div>
              <div className="lk-badge">🔐&nbsp; Secure Access Portal</div>
              <h2 className="lk-title">Welcome back</h2>
              <p className="lk-form-sub">Sign in to your operations dashboard</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="lk-field">
                <label htmlFor="email">Work Email</label>
                <div className="lk-input-wrap">
                  <input
                    id="email"
                    className="lk-input"
                    type="email"
                    required
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="lk-field">
                <label htmlFor="password">Password</label>
                <div className="lk-input-wrap">
                  <input
                    id="password"
                    className="lk-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="lk-options">
                <label className="lk-remember">
                  <input type="checkbox" /> Keep me signed in
                </label>
                <a href="#" className="lk-forgot">Forgot password?</a>
              </div>

              <button type="submit" disabled={isLoading} className="lk-btn">
                {isLoading ? 'Authenticating…' : 'Sign in to dashboard →'}
              </button>
            </form>

            <div className="lk-sep">
              <div className="lk-sep-line" />
              <span className="lk-sep-txt">or continue with</span>
              <div className="lk-sep-line" />
            </div>

            <button type="button" className="lk-sso">
              🏢&nbsp; Single Sign-On (SSO)
            </button>

            <p className="lk-footer">
              No account?{' '}
              <Link href="/signup">Request access →</Link>
            </p>

            <div className="lk-trust">
              <span className="lk-trust-icon" aria-hidden="true">✓</span>
              <span className="lk-trust-txt">Encrypted · GDPR compliant · Enterprise-grade security</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}