import apiClient from './client';
import { Product, ProductCategory, ProductFilter } from '@/types/product';
import { PaginatedResponse } from '@/types/api';

export const productsAPI = {
  getAll: async (filters?: ProductFilter): Promise<PaginatedResponse<Product>> => {
    const res = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: filters,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await apiClient.get<Product>(`/products/${id}`);
    return res.data;
  },

  getCategories: async (): Promise<ProductCategory[]> => {
    const res = await apiClient.get<ProductCategory[]>('/categories');
    return res.data;
  },
};