/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignInForm'

test('Sign in page is rendered', () => {
    const {container} = render(<SignIn />);
    const h2 = container.querySelector('h2')
    expect(h2).toHaveTextContent('Sign In');
});

test('Sign in email input is enabled', () => {
    const {container} = render(<SignIn/>)
    const input = container.querySelector('#sign-in-email')
    expect(input).toBeEnabled();
});

test('Sign in password input is enabled', () => {
    const {container} = render(<SignIn/>)
    const input = container.querySelector('#sign-in-password')
    expect(input).toBeEnabled();
});

test('Sign in button input is enabled', () => {
    const {container} = render(<SignIn/>)
    const input = container.querySelector('#sign-in-button')
    expect(input).toBeEnabled();
});

test('Sign in button input is enabled', () => {
    const {container} = render(<SignIn/>)
    const link = container.querySelector('#sign-in-registration-redirect')
    expect(link).toBeInTheDocument();
});