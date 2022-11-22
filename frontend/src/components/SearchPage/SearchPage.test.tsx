/* eslint-disable */
import { render, fireEvent } from '@testing-library/react';
import SearchPage from './SearchPage'
import {BrowserRouter as Router} from 'react-router-dom';

describe('<SearchPage/> component', () => {
    let container:any;

    beforeEach(() => {
      container = render(
            <Router>
                <SearchPage />
            </Router>
        ).container;
    })
    
    test('Search results page is rendered', () => {
        const h2 = container.querySelector('.search-banner h2')
        expect(h2).toHaveTextContent('Search Results');
    });
    
    test('Pagination arrow buttons are enabled', () => {
        const input = container.querySelector('#left-arrow')
        expect(input).toBeEnabled();
    });
    
    test('Search results div is rendered', () => {
        const div = container.querySelector('.search-results')
        expect(div).toBeInTheDocument();
    });

    test('Confirm no results are currently rendered', () => {
        const div = container.querySelector('.no-results')
        expect(div).toHaveTextContent('No Results Found!');
    });
    
    test('Search refinement options div is rendered', () => {
        const h3 = container.querySelector('.search-options h3')
        expect(h3).toHaveTextContent('Search Options');
    });
    
    test('Seeking refinement option is present', () => {
        const dropdown = container.querySelector('.search-seeking-dropdown')
        expect(dropdown).toBeInTheDocument();
    });

    test('Zip code refinement input is enabled', () => {
        const input = container.querySelector('.search-zipcode-input')
        expect(input).toBeEnabled();
    });

    test('Update search button is enabled', () => {
        const button = container.querySelector('.update-search-button')
        expect(button).toBeEnabled();
    });
    
    test('Error message not showing by default', () => {
        const errors = container.querySelector('.search-options .error-message')
        expect(errors).not.toBeInTheDocument();
    });
    
    test('Error message is correctly rendered on error', () => {
        const updateSearchButton = container.querySelector('.update-search-button')
        fireEvent.click(updateSearchButton)

        const errors = container.querySelector('.search-options .error-message')
        expect(errors).toBeInTheDocument();
    });
})