// src/api/household.ts
import api from '../utils/api';

// CREATE HOUSEHOLD - Save address and family info
export const createHousehold = async (householdData: any) => {
  try {
    const response = await api.post('/household', householdData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// GET HOUSEHOLD - Fetch user's household info
export const getHousehold = async (householdId: string) => {
  try {
    const response = await api.get(`/household/${householdId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// UPDATE HOUSEHOLD - Update household details
export const updateHousehold = async (householdId: string, householdData: any) => {
  try {
    const response = await api.put(`/household/${householdId}`, householdData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};