/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from './SignUpForm'
describe('<SignUp/> component',() => {
  
    let container:any;
    beforeEach(() => {
      container = render(<SignUp/>).container
    })
    
    test('Sign up page is rendered', () => {
        const h2 = container.querySelector('h2')
        expect(h2).toHaveTextContent('Sign Up');
    });
    
    test('Sign Up email input is enabled', () => {
        const input = container.querySelector('#sign-up-email')
        expect(input).toBeEnabled();
    });
    
    test('Sign Up password input is enabled', () => {
        const input = container.querySelector('#sign-up-password')
        expect(input).toBeEnabled();
    });
    
    test('Sign Up repeat password input is enabled', () => {
        const input = container.querySelector('#sign-up-repeat-password')
        expect(input).toBeEnabled();
    });
    
    test('Sign Up button input is enabled', () => {
        const input = container.querySelector('#sign-up-button')
        expect(input).toBeEnabled();
    });
})