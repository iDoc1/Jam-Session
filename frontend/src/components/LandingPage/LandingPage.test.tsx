/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage'
import {BrowserRouter as Router} from 'react-router-dom';


describe('<LandingPage/> component', () => {
  
    let container:any;
    beforeEach(() => {
      container = render(
        <Router>
           <LandingPage/> 
        </Router>
      ).container;
    })
    
    test('Landing page is rendered', () => {
        const h3 = container.querySelector('h3')
        expect(h3).toHaveTextContent('Connect with fellow musicians');
    });

    test("'I am seeking' component is enabled", () => {
        const siteTitle = container.querySelector('.landing-seeking')
        expect(siteTitle).toBeEnabled();
    });

    test("Instrument component is enabled", () => {
        const siteTitle = container.querySelector('.landing-instrument')
        expect(siteTitle).toBeEnabled();
    });

    test("Zipcode component is enabled", () => {
        const siteTitle = container.querySelector('.landing-zipcode')
        expect(siteTitle).toBeEnabled();
    });

    test("Search button component is enabled", () => {
        const siteTitle = container.querySelector('.landing-search')
        expect(siteTitle).toBeEnabled();
    });
})

