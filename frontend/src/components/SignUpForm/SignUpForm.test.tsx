import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from './SignUpForm'

test('Sign up page is rendered', () => {
  render(<SignUp />);
  const linkElement = screen.getByText(/sign up/i);
  expect(linkElement).toBeInTheDocument();
});
