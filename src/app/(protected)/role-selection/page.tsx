// src/app/(protected)/role-selection/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth';

export default function RoleSelection(): React.ReactElement {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const handleSelectRole = async (role: UserRole): Promise<void> => {
    setSelectedRole(role);
    setLoading(true);

    try {
      // Update local global state store configuration
      if (user) {
        setUser({ ...user, role });
      }

      // Route based on compliance logic
      setTimeout(() => {
        if (role === 'customer') {
          router.push('/household-setup');
        } else {
          // Placeholders for Phase 3 components
          alert(`Role "${role}" successfully assigned! Onboarding dashboard coming in Phase 3.`);
          setLoading(false);
        }
      }, 600);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="role-container">
      <h1>Welcome to LifeKart!</h1>
      <h2>Choose your platform profile role</h2>

      <div className="role-grid">
        <div
          className={`role-card ${selectedRole === 'customer' ? 'selected' : ''}`}
          onClick={() => void handleSelectRole('customer')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && void handleSelectRole('customer')}
        >
          <div className="role-icon" aria-hidden="true">👨‍👩‍👧‍👦</div>
          <h3>Customer</h3>
          <p>Subscribe to premium consumer products for lifetime security</p>
          <button className="btn-primary" tabIndex={-1}>Select Profile</button>
        </div>

        <div
          className={`role-card ${selectedRole === 'manufacturer' ? 'selected' : ''}`}
          onClick={() => void handleSelectRole('manufacturer')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && void handleSelectRole('manufacturer')}
        >
          <div className="role-icon" aria-hidden="true">🏭</div>
          <h3>Manufacturer</h3>
          <p>Deploy directly to consumers and manage wholesale pipeline logistics</p>
          <button className="btn-primary" tabIndex={-1}>Select Profile</button>
        </div>

        <div
          className={`role-card ${selectedRole === 'corporate_admin' ? 'selected' : ''}`}
          onClick={() => void handleSelectRole('corporate_admin')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && void handleSelectRole('corporate_admin')}
        >
          <div className="role-icon" aria-hidden="true">🏢</div>
          <h3>Corporate</h3>
          <p>Manage continuous high-volume employee wellness micro-benefits</p>
          <button className="btn-primary" tabIndex={-1}>Select Profile</button>
        </div>
      </div>

      {loading && <div aria-live="polite" style={{ marginTop: '20px', fontWeight: 600 }}>Initializing profile layout...</div>}
    </div>
  );
}