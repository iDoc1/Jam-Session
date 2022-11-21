import './IndividualPostPage.css'

import React, { useEffect, useState, useCallback } from 'react'
import Comment from '../Comment/Comment';
import { Genres, Post, IndividualComment } from '../../types'
import { useLocation } from 'react-router-dom';



const defaultPost = {
    "comments": [
        {
            "id": 0,
            "user": 0,
            "user_profile_id": 0,
            "user_first_name": "Commenter",
            "user_last_name": "Name",
            "post": 0,
            "content": "Sample Comment",
            "comment_date": "2022-11-19T05:14:36.053206Z"
        }
    ],
    "content" : "Sample content body",
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
    "id": 0,
    "owner_user_id": 0,
    "owner_profile_id": 0,
    "owner_first_name": "Sample",
    "owner_last_name": "Name",
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
    "posted_date": "2022-11-19T05:13:44.853348Z",
    "seeking": "musicians",
    "title": "Sample Post Title",
    "user": 0,
    "zipcode": "99999",
    "city": "City",
    "state": "State"
}

function IndividualPostPage() {
    const { state } = useLocation();
    const [post, setPost] = useState<Post | any>(defaultPost);
    console.log(post)
    const [commentsList, setCommentsList] = useState<any>(defaultPost.comments);
    const [comment, setComment] = useState('');

    const getPost =  useCallback(() => {
        const { resJSON } = state || {};
        if (resJSON) {
            setPost(resJSON)
            setCommentsList(resJSON.comments)
        }
  
    },[state])

    const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
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

    const handleSubmitComment = async () => {
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
        
        if (res.ok){
            setCommentsList([...commentsList, resJSON])
            setComment('')
        }
        
    }

    useEffect(() => {
      getPost();
    }, [getPost])
    
    return (
        <div className='content-container'>
            <div className="post-banner">
                <h2>{post.title}</h2>
                <div className="post-name-location">
                    <h2>{post.owner_first_name} {post.owner_last_name}</h2>
                    <h4><span className='normal-weight'>{post.city}, {post.state} {post.zipcode}</span></h4>
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
                    <textarea name="" id="" cols={30} rows={3} value={comment} onChange={handleComment}></textarea>
                    <button className="post-comment" onClick={handleSubmitComment}>Post</button>
                </div>
                <div className="comment-section">
                        {
                            commentsList.map((c:IndividualComment) => {
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