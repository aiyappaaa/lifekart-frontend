import { useAuthStore } from '@/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Clear the store state before running each test case
    useAuthStore.setState({ user: null, token: null, isLoading: false });
    localStorage.clear();
  });

  it('should set and clear token on login/logout', () => {
    const { setToken, logout, isAuthenticated } = useAuthStore.getState();
    
    // Simulate setting a valid JWT token
    setToken('test-token');
    expect(useAuthStore.getState().token).toBe('test-token');
    expect(isAuthenticated()).toBe(true);
    
    // Simulate triggering a manual logout clear sequence
    logout();
    expect(useAuthStore.getState().token).toBe(null);
    expect(isAuthenticated()).toBe(false);
  });
});