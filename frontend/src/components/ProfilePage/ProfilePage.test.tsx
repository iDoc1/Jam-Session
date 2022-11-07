/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage'

test('Profile page is rendered', () => {
    const { container } = render(<ProfilePage />);
    const div = container.querySelector('.profile')
    expect(div).toBeInTheDocument();
});

test('User banner is rendered', () => {
    const { container } = render(<ProfilePage />);
    const div = container.querySelector('.user-banner')
    expect(div).toBeInTheDocument();
});
test('User about is rendered', () => {
    const { container } = render(<ProfilePage />);
    const div = container.querySelector('.user-about')
    expect(div).toBeInTheDocument();
});
test('User info is rendered', () => {
    const { container } = render(<ProfilePage />);
    const div = container.querySelector('.user-info')
    expect(div).toBeInTheDocument();
});
test('Contact button is enabled', () => {
    const { container } = render(<ProfilePage />);
    const button = container.querySelector('.user-info div button')
    expect(button).toBeEnabled();
});

test('User music is rendered', () => {
    const { container } = render(<ProfilePage />);
    const div = container.querySelector('.user-music')
    expect(div).toBeInTheDocument();
});



