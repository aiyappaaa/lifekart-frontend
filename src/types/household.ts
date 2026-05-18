export type RelationshipType = 'self' | 'spouse' | 'child' | 'dependent_parent' | 'other';
export type GenderType = 'male' | 'female' | 'other';
export type DietaryPreference = 'vegetarian' | 'non_veg' | 'vegan' | 'jain' | 'keto' | 'diabetic';

export interface Household {
  id: string;
  user_id: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  lat: number | null;
  lng: number | null;
  monthly_grocery_budget: number | null;
  prefer_organic: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateHouseholdRequest {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  monthly_grocery_budget?: number;
  prefer_organic?: boolean;
}

export interface Member {
  id: string;
  household_id: string;
  full_name: string;
  relationship: RelationshipType;
  date_of_birth: string;
  gender: GenderType;
  dietary_preference: DietaryPreference | null;
  lifestyle_tags: string[];
  is_active: boolean;
}

export interface CreateMemberRequest {
  full_name: string;
  relationship: RelationshipType;
  date_of_birth: string;
  gender: GenderType;
  dietary_preference?: DietaryPreference;
  lifestyle_tags?: string[];
}