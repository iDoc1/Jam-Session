import './IndividualPostPage.css'

import React, { useEffect, useState, useCallback } from 'react'
import Comment from '../Comment/Comment';
import { Genres, Post, IndividualComment } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize, defaultPost } from '../../helpers/helpers';

function IndividualPostPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | any>(defaultPost);
    const [commentsList, setCommentsList] = useState<any>(defaultPost.comments);

    const [comment, setComment] = useState('');
    
    const [currentUserID, setCurrentUserID] = useState(null);

    const getPost =  useCallback(async () => {
        const { resJSON } = state || {};
        if (!resJSON) return
        
        setPost(resJSON)
        setCommentsList(resJSON.comments)

        const res = await fetch(`/auth/users/me/`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        })        
        const currentUser = await res.json()
        setCurrentUserID(currentUser.id)
    },[state])

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
        
        if (res.ok){
            setCommentsList([...commentsList, resJSON])
            setComment('')
        }
        
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')){
            const res = await fetch(`/api/posts/${post.id}/`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
            })
            if (res.ok) {
                navigate('/search');
            } 
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
                    {post.owner_user_id === currentUserID? <button className='post-delete-button' onClick={handleDelete}>Delete</button>: null}
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