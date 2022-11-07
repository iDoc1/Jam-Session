/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignInForm'
import {BrowserRouter as Router} from 'react-router-dom';

test('Sign in page is rendered', () => {
    const mockFunction = () => {
        return;
    }
    const {container} = render(
        <Router>
            <SignIn isAuthenticated={false} setIsAuthenticated={mockFunction} />
        </Router>
    );
    const h2 = container.querySelector('h2')
    expect(h2).toHaveTextContent('Sign In');
});

test('Sign in email input is enabled', () => {
    const mockFunction = () => {
        return;
    }
    const {container} = render(
        <Router>
            <SignIn isAuthenticated={false} setIsAuthenticated={mockFunction} />
        </Router>
    )
    const input = container.querySelector('#sign-in-email')
    expect(input).toBeEnabled();
});

test('Sign in password input is enabled', () => {
    const mockFunction = () => {
        return;
    }
    const {container} = render(
        <Router>
            <SignIn isAuthenticated={false} setIsAuthenticated={mockFunction} />
        </Router>
    )
    const input = container.querySelector('#sign-in-password')
    expect(input).toBeEnabled();
});

test('Sign in button input is enabled', () => {
    const mockFunction = () => {
        return;
    }
    const {container} = render(
        <Router>
            <SignIn isAuthenticated={false} setIsAuthenticated={mockFunction} />
        </Router>
    )
    const input = container.querySelector('#sign-in-button')
    expect(input).toBeEnabled();
});

test('Sign in button input is enabled', () => {
    const mockFunction = () => {
        return;
    }
    const {container} = render(
        <Router>
            <SignIn isAuthenticated={false} setIsAuthenticated={mockFunction} />
        </Router>
    )
    const link = container.querySelector('#sign-in-registration-redirect')
    expect(link).toBeInTheDocument();
});