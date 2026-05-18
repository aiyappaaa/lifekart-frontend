import apiClient from './client';
import {
  Household,
  CreateHouseholdRequest,
  Member,
  CreateMemberRequest,
} from '@/types/household';

export const householdAPI = {
  create: async (data: CreateHouseholdRequest): Promise<Household> => {
    const res = await apiClient.post<Household>('/household', data);
    return res.data;
  },

  get: async (id: string): Promise<Household> => {
    const res = await apiClient.get<Household>(`/household/${id}`);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateHouseholdRequest>): Promise<Household> => {
    const res = await apiClient.put<Household>(`/household/${id}`, data);
    return res.data;
  },

  addMember: async (householdId: string, data: CreateMemberRequest): Promise<Member> => {
    const res = await apiClient.post<Member>(`/household/${householdId}/members`, data);
    return res.data;
  },

  getMembers: async (householdId: string): Promise<Member[]> => {
    const res = await apiClient.get<Member[]>(`/household/${householdId}/members`);
    return res.data;
  },
};