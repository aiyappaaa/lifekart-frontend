export interface HealthProfile {
  id: string;
  member_id: string;
  blood_group: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  existing_conditions: string[];
  allergies: string[];
}