/* eslint-disable */
import { render, fireEvent } from '@testing-library/react';
import PostCard from './PostCard'
import {BrowserRouter as Router} from 'react-router-dom';

describe('<PostCard/> component', () => {
    let container:any;
    const samplePost = {
        "id": 20,
        "owner_user_id": 13,
        "owner_profile_id": 13,
        "owner_first_name": "Full",
        "owner_last_name": "Name",
        "title": "Sample post",
        "seeking": "musicians",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "zipcode": "99204",
        "city": "Spokane",
        "state": "WA",
        "posted_date": "2022-11-21T04:27:11.646123Z",
        "instruments": [
            {
                "id": 6,
                "name": "vocals"
            },
            {
                "id": 8,
                "name": "guitar"
            },
            {
                "id": 11,
                "name": "brass"
            }
        ],
        "genres": [
            {
                "id": 2,
                "genre": "rock"
            },
            {
                "id": 3,
                "genre": "metal"
            },
            {
                "id": 4,
                "genre": "r&b"
            }
        ],
        "comments": []
    }

    const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    beforeEach(() => {
      container = render(
            <Router>
                <PostCard post={samplePost} />
            </Router>
        ).container;
    })
    
    test('Post card is rendered', () => {
        const div = container.querySelector('.post-card')
        expect(div).toBeInTheDocument();
    });

    test('Correct post title is rendered', () => {
        const h3 = container.querySelector('.post-card-title h3');
        expect(h3).toHaveTextContent(samplePost.title);
    });

    test('Post content div is rendered', () => {
        const div = container.querySelector('.post-card-content')
        expect(div).toBeInTheDocument();
    });    

    test('Correct post seeking option is rendered', () => {
        const span = container.querySelector('#card-content-seeking');
        expect(span).toHaveTextContent(capitalize(samplePost.seeking));
    });
})