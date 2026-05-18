import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z
  .object({
    full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z
      .string()
      .regex(/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit Indian mobile number')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const householdSchema = z.object({
  address_line1: z.string().min(5, 'Address too short').max(255),
  address_line2: z.string().max(255).optional(),
  city: z.string().min(2, 'Enter a valid city').max(100),
  state: z.string().min(2, 'Enter a valid state').max(100),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit pincode'),
  monthly_grocery_budget: z.coerce.number().min(500, 'Minimum budget is ₹500').max(500000).optional(),
  prefer_organic: z.boolean().default(false),
});

export const memberSchema = z.object({
  full_name: z.string().min(2).max(100),
  relationship: z.enum(['self', 'spouse', 'child', 'dependent_parent', 'other']),
  date_of_birth: z.string().refine((val) => {
    const date = new Date(val);
    return date <= new Date() && date.getFullYear() > 1900;
  }, 'Enter a valid date of birth'),
  gender: z.enum(['male', 'female', 'other']),
  dietary_preference: z
    .enum(['vegetarian', 'non_veg', 'vegan', 'jain', 'keto', 'diabetic'])
    .optional(),
  lifestyle_tags: z.array(z.string()).default([]),
});

// Export TypeScript types inferred directly from the Zod schemas!
export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type HouseholdSchema = z.infer<typeof householdSchema>;
export type MemberSchema = z.infer<typeof memberSchema>;