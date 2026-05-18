import apiClient from './client';
import {
  Subscription,
  CreateSubscriptionRequest,
  SubscriptionStatus,
} from '@/types/subscription';
import { PaginatedResponse } from '@/types/api';

export const subscriptionsAPI = {
  create: async (data: CreateSubscriptionRequest): Promise<Subscription> => {
    const res = await apiClient.post<Subscription>('/subscriptions', data);
    return res.data;
  },

  getAll: async (status?: SubscriptionStatus): Promise<PaginatedResponse<Subscription>> => {
    const res = await apiClient.get<PaginatedResponse<Subscription>>('/subscriptions', {
      params: status ? { status } : undefined,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Subscription> => {
    const res = await apiClient.get<Subscription>(`/subscriptions/${id}`);
    return res.data;
  },

  pause: async (id: string): Promise<Subscription> => {
    const res = await apiClient.put<Subscription>(`/subscriptions/${id}`, {
      status: 'paused',
    });
    return res.data;
  },

  resume: async (id: string): Promise<Subscription> => {
    const res = await apiClient.put<Subscription>(`/subscriptions/${id}`, {
      status: 'active',
    });
    return res.data;
  },

  cancel: async (id: string): Promise<Subscription> => {
    const res = await apiClient.put<Subscription>(`/subscriptions/${id}`, {
      status: 'cancelled',
    });
    return res.data;
  },
};