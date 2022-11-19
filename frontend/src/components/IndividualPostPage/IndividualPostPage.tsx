import './IndividualPostPage.css'

import React, { useEffect, useState, useCallback } from 'react'
import Comment from '../Comment/Comment';
import { Genres, Post } from '../../types'
import { useLocation } from 'react-router-dom';


const defaultPost = {
    "comments": [],
    "content" : "I would like this to be able to show multiple lines.\n\nHopefully, this is on a second line!",
    "genres": [],
    "id": 3,
    "instruments": [],
    "posted_date": "2022-11-18T04:51:39.010024Z",
    "seeking": "musicians",
    "title": "Test post for styling",
    "user": 13,
    "zipcode": "98382"
}
function IndividualPostPage() {
    const { state } = useLocation();
    const [post, setPost] = useState<Post>(defaultPost);
    const [comment, setComment] = useState('');

    const getPost =  useCallback(() => {
        const { resJSON } = state || {};
        setPost(resJSON)
    },[state])

    const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const uncapitalize = (string: string) => {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    const getGenreSelections = (genres:Genres[]) => {
        if (!genres) return
        let genreString = '';
        genres.map((x: Genres) => genreString += capitalize(x.genre) + ', ');
        genreString = genreString.slice(0, -2);
        return genreString;
    }

    const getInstrumentSelections = (post:Post) => {
        if (!post) return
        let instrumentString = '';
        post.instruments.map((x: any) => instrumentString += capitalize(x.name) + ', ');
        instrumentString = instrumentString.slice(0, -2);
        return instrumentString;
    }

    const handleComment = (event:any) => {
        setComment(event.target.value)
    }

    const handleSubmitPost = async () => {
        const data = {
            "post": post.id,
            "content": comment
        }
        const res = await fetch(`/api/comments/`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
        })
        const resJSON = await res.json()
        console.log(resJSON);
        
    }
    const retrievePost = async () => {
        const res = await fetch(`/api/posts/?zipcode=98382&radius=5`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const resJSON = await res.json()
        setPost(resJSON[0])
        // console.log(resJSON[0]);
        
    }
    useEffect(() => {
        retrievePost();
    //   getPost();
    }, [getPost])
    
    return (
        <div className='content-container'>
            <div className="post-banner">
                <h2>{post.title}</h2>
                <div className="post-name-location">
                    <h2>Nick Bowden</h2>
                    <h4><span className='normal-weight'>Sequim, WA 98382</span></h4>
                </div>
            </div>
            <hr />
            <div className="post-content">
                <div className="post-genres-instruments">
                    <h4>Genres: <span className='normal-weight'>{getGenreSelections(post.genres)}</span></h4>
                    <h4>Instruments: <span className='normal-weight'>{getInstrumentSelections(post)}</span></h4>
                </div>
                <div className="post-content-body">
                    <span className='content-body'>{post.content}</span>
                </div>
                <div className="comments">
                    <h3>Comments</h3>
                    <hr />
                    <textarea name="" id="" cols={30} rows={3} onChange={handleComment}></textarea>
                    <button className="post-comment" onClick={handleSubmitPost}>Post</button>
                </div>
                <div className="comment-section">
                        {
                            post.comments.map((c:any) => {
                                return (
                                <React.Fragment key={c.id}>
                                    <Comment comment={c} />
                                </React.Fragment>
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default IndividualPostPage