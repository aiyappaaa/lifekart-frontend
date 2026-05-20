// __tests__/api/auth.test.ts
import { authAPI } from '@/api/auth';
import apiClient from '@/api/client';

// Mock the core Axios client so we don't make real network requests during tests
jest.mock('@/api/client');

describe('authAPI', () => {
  it('should login successfully and return a token', async () => {
    // 1. Arrange: Setup the mock response
    const mockResponse = {
      data: {
        access_token: 'fake-jwt-token',
        token_type: 'bearer',
        user: { id: '1', email: 'test@example.com', role: 'customer' }
      }
    };
    (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

    // 2. Act: Execute the function
    const result = await authAPI.login({
      email: 'test@example.com',
      password: 'securepassword123'
    });

    // 3. Assert: Verify the behavior
    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'securepassword123'
    });
    expect(result.access_token).toBe('fake-jwt-token');
  });
});