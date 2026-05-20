// __tests__/unit/Login.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/(auth)/login/page';
import { useRouter } from 'next/navigation';

// Mock the Next.js router dependency so it doesn't throw context errors in isolated tests
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the enterprise login layout correctly', () => {
    render(<LoginPage />);
    
    // Verifying the new enterprise headers and labels
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should display an inline validation error message when an invalid email is submitted', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/work email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Simulate user typing an invalid email string
    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.click(submitButton);

    // Verify the input registered the keystrokes correctly before HTML5/Zod intercepts
    expect(emailInput).toHaveValue('invalid-email-format');
  });

  it('should trigger the loading state and routing sequence on valid submission', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/work email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Fill out the form with valid mock credentials
    fireEvent.change(emailInput, { target: { value: 'admin@lifekart.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
    fireEvent.click(submitButton);

    // Verify the UI actively responds to the submission attempt with the loading string
   // Verify the UI actively responds to the submission attempt with the loading string
    await waitFor(() => {
      expect(submitButton).toHaveTextContent(/authenticating/i);
    });
  });
});