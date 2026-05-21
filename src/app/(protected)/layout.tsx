import type { Metadata } from 'next';
import { QueryProvider } from '@/components/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeKart OS | Lifetime Commerce',
  description: 'The operating system for lifetime human consumption and wholesale pricing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white antialiased selection:bg-white/20">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}