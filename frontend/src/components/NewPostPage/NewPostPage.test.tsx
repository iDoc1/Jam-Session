/* eslint-disable */
import { render } from '@testing-library/react';
import NewPostPage from './NewPostPage'
import {BrowserRouter as Router} from 'react-router-dom';

describe('<NewPostPage/> component', () => {
    let container:any;

    beforeEach(() => {
      container = render(
            <Router>
                <NewPostPage />
            </Router>
        ).container;
    })
    
    test('New Post page is rendered', () => {
        const h2 = container.querySelector('.new-post-form-wrapper h2')
        expect(h2).toHaveTextContent('Create New Post');
    });
    
    test('Post title input is enabled', () => {
        const input = container.querySelector('#post-title')
        expect(input).toBeEnabled();
    });
    
    test('Post content textarea is enabled', () => {
        const textarea = container.querySelector('#post-content')
        expect(textarea).toBeEnabled();
    });
    
    test('Create post input is enabled', () => {
        const input = container.querySelector('.post-submit-button')
        expect(input).toBeEnabled();
    });
    
    test('Error div is present', () => {
        const errors = container.querySelector('.new-post-form-wrapper .error-message')
        expect(errors).toBeInTheDocument();
    });
})