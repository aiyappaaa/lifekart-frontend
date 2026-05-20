export interface Gift {
  id: string;
  beneficiary_name: string;
  beneficiary_dob: string;
  start_age: number;
  end_age: number;
  status: 'active' | 'completed';
  total_value_locked: number;
}