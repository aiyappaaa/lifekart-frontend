"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchema } from '@/utils/validation';
import { authAPI } from '@/api/auth';
import { FadeIn } from '@/components/motion/FadeIn';
import { GlassPanel } from '@/components/ui/GlassPanel';

export default function Signup() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    setServerError('');
    try {
      const { confirm_password, ...signupData } = data; 
      await authAPI.signup(signupData);
      router.push('/login?message=Signup successful! Please login.');
    } catch (err: any) {
      setServerError(err.detail || 'Signup failed. Email might already be registered.');
    }
  };

  const InputField = ({ label, id, type, placeholder, error, registerProps }: any) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-surface/50 border ${error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-white/20 focus:border-white/30'} rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all`}
        {...registerProps}
      />
      {error && <span className="text-[10px] text-red-400 mt-1 block">{error.message}</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium z-20">
        ← Return to OS
      </Link>

      <FadeIn delay={0.1} className="w-full max-w-lg z-10">
        <GlassPanel className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-white/50">Establish your lifetime consumption profile</p>
          </div>

          {serverError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <InputField 
              label="Full Name *" id="full_name" type="text" placeholder="Aiyappa" 
              error={errors.full_name} registerProps={register('full_name')} 
            />
            
            <InputField 
              label="Email Address *" id="email" type="email" placeholder="you@lifekart.com" 
              error={errors.email} registerProps={register('email')} 
            />
            
            <InputField 
              label="Phone Number (Optional)" id="phone" type="tel" placeholder="9876543210" 
              error={errors.phone} registerProps={register('phone')} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField 
                label="Password *" id="password" type="password" placeholder="••••••••" 
                error={errors.password} registerProps={register('password')} 
              />
              <InputField 
                label="Confirm *" id="confirm_password" type="password" placeholder="••••••••" 
                error={errors.confirm_password} registerProps={register('confirm_password')} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-70 mt-6"
            >
              {isSubmitting ? 'Provisioning...' : 'Sign Up →'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-xs text-white/40">
              Already have an account? <Link href="/login" className="text-white hover:underline">Access Terminal</Link>
            </p>
          </div>
        </GlassPanel>
      </FadeIn>
    </div>
  );
}