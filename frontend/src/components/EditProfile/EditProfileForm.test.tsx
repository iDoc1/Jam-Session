/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import EditProfileForm from './EditProfileForm'
import {BrowserRouter as Router} from 'react-router-dom';


describe('<EditProfileForm/> component', () => {
  
    let container:any;
    beforeEach(() => {
      container = render(
        <Router>
            <EditProfileForm/>
        </Router>
      ).container;
    })

    test('Edit Profile page is rendered', () => {
        const form = container.querySelector('form')
        expect(form).toBeInTheDocument();
    });
    
    test('First name input is rendered', () => {
        const firstName = container.querySelector('#edit-profile-first')
        expect(firstName).toBeInTheDocument();
    });

    test('Gender dropdown is rendered', () => {
        const genderDropdown = container.querySelector('.edit-gender')
        expect(genderDropdown).toBeInTheDocument();
    });

    test('Birth date input is rendered', () => {
        const birthDate = container.querySelector('#edit-profile-birth-date')
        expect(birthDate).toBeInTheDocument();
    });
    
    test('Genre selection button is enabled', () => {
        const button = container.querySelector('#genre-selections-button')
        expect(button).toBeEnabled();
    });
    
    test('Instrument dropdown is rendered', () => {
        const editInstrument = container.querySelector('.edit-instrument-dropdown')
        expect(editInstrument).toBeInTheDocument();
    });

    test('Social input is rendered', () => {
        const editSocial = container.querySelector('#edit-profile-facebook')
        expect(editSocial).toBeInTheDocument();
    });

    test('Save changes button is enabled', () => {
        const button = container.querySelector('#save-changes-button')
        expect(button).toBeEnabled();
    });
})



