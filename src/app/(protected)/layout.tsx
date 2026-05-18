// src/app/(protected)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  useEffect(() => {
    // If the token is missing, redirect them to the login screen immediately
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // Accessibility friendly loading announcement for screen readers
  if (!isAuthenticated) {
    return <div aria-live="polite">Redirecting...</div>;
  }

  return <>{children}</>;
}