// src/app/role-selection/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelectRole = async (role: string) => {
    setSelectedRole(role);
    setLoading(true);

    // Simulate a tiny delay for UX, then route to the correct setup page
    setTimeout(() => {
      if (role === 'customer') {
        router.push('/household-setup');
      } else if (role === 'manufacturer') {
        router.push('/manufacturer-setup'); // We will build this later!
      } else if (role === 'corporate') {
        router.push('/corporate-setup'); // We will build this later!
      }
    }, 500);
  };

  return (
    <div className="role-container">
      <h1>Welcome to LifeKart!</h1>
      <h2>Choose your role</h2>

      <div className="role-grid">
        {/* Customer Role */}
        <div
          className={`role-card ${selectedRole === 'customer' ? 'selected' : ''}`}
          onClick={() => handleSelectRole('customer')}
        >
          <div className="role-icon">👨‍👩‍👧‍👦</div>
          <h3>Customer</h3>
          <p>Subscribe to products for lifetime</p>
          <button className="btn-primary">Choose</button>
        </div>

        {/* Manufacturer Role */}
        <div
          className={`role-card ${selectedRole === 'manufacturer' ? 'selected' : ''}`}
          onClick={() => handleSelectRole('manufacturer')}
        >
          <div className="role-icon">🏭</div>
          <h3>Manufacturer</h3>
          <p>Sell your products wholesale</p>
          <button className="btn-primary">Choose</button>
        </div>

        {/* Corporate Role */}
        <div
          className={`role-card ${selectedRole === 'corporate' ? 'selected' : ''}`}
          onClick={() => handleSelectRole('corporate')}
        >
          <div className="role-icon">🏢</div>
          <h3>Corporate</h3>
          <p>Manage employee benefits</p>
          <button className="btn-primary">Choose</button>
        </div>
      </div>

      {loading && <p style={{ marginTop: '20px' }}>Loading...</p>}
    </div>
  );
}