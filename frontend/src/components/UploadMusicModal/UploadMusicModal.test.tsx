/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../ProfilePage/ProfilePage'
import {BrowserRouter as Router} from 'react-router-dom';


describe('<ProfilePage/> component', () => {
  
    let container:any;
    beforeEach(() => {
      container = render(
        <Router>
            <ProfilePage testing={true} />
        </Router>
      ).container;
    })

    test('Profile page is rendered', () => {
        const div = container.querySelector('.profile')
        expect(div).toBeInTheDocument();
    });
    
    test('Modal content is not rendered', () => {
        const div = container.querySelector('.music-modal-content h2')
        expect(div).not.toBeInTheDocument()
    });

    test('Edit profile picture button is enabled', () => {
        const button = container.querySelector('#edit-music-button')
        expect(button).toBeEnabled();
    });

    
    test('Modal can be opened', () => {
        const button = container.querySelector('#edit-music-button')
        fireEvent.click(button)
        const div = container.querySelector('.music-modal-content h2')
        expect(div).toBeInTheDocument();
    });

    test('File upload input is rendered', () => {
        const button = container.querySelector('#edit-music-button')
        fireEvent.click(button)
        const input = container.querySelector('#upload-music-file')
        expect(input).toBeInTheDocument();
    });
    
    test('Close button is enabled', () => {
        const openButton = container.querySelector('#edit-music-button')
        fireEvent.click(openButton)

        const button = container.querySelector('.close-modal')
        expect(button).toBeEnabled();
    });
    
    test('Modal information is not visible after being closed', () => {
        const openButton = container.querySelector('#edit-music-button')
        fireEvent.click(openButton)

        const closeButton = container.querySelector('.close-modal')
        fireEvent.click(closeButton)

        const modalTitle = container.querySelector('.music-modal-content h2')
        expect(modalTitle).not.toBeInTheDocument()
    });
})



