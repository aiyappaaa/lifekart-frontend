// src/api/payments.ts
import apiClient from './client';

export const paymentsAPI = {
  createCheckout: async (amount: number, subscriptionId: string) => {
    const res = await apiClient.post('/checkout', {
      amount,
      subscription_id: subscriptionId,
    });
    return res.data;
  },

  getInvoices: async () => {
    const res = await apiClient.get('/invoices');
    return res.data;
  },
};