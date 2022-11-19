/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import IndividualPostPage from './IndividualPostPage'
import {BrowserRouter as Router} from 'react-router-dom';


describe('<IndividualPostPage /> component', () => {
  
    let container:any;
    beforeEach(() => {
      container = render(
        <Router>
            <IndividualPostPage />
        </Router>
      ).container;
    })

    test('Profile page is rendered', () => {
        const div = container.querySelector('.content-container')
        expect(div).toBeInTheDocument();
    });
    
    test('Post banner is rendered', () => {
        const h2 = container.querySelector('.post-banner h2')
        expect(h2).toHaveTextContent('Sample Post Title');
    });

    test('Post user name is rendered', () => {
        const h2 = container.querySelector('.post-name-location h2')
        expect(h2).toHaveTextContent('Sample Name');
    });

    test('Post genres and instruments is rendered', () => {
        const div = container.querySelector('.post-genres-instruments')
        expect(div).toBeInTheDocument();
    });

    test('Post content body is rendered', () => {
        const span = container.querySelector('.content-body')
        expect(span).toHaveTextContent('Sample content body');
    });
    
    test('Post comment box is rendered', () => {
        const textarea = container.querySelector('.comments textarea')
        expect(textarea).toBeInTheDocument();
    });

    test('Post comment is rendered', () => {
        const comment = container.querySelector('.individual-comment span')
        expect(comment).toHaveTextContent('Sample Comment')
    });

    test('Post comment button is enabled', () => {
        const button = container.querySelector('.post-comment')
        expect(button).toBeEnabled();
    });

})



