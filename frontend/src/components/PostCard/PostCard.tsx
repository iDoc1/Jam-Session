import React from 'react'
import './PostCard.css'
import { Genres } from '../../types'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '../../helpers/helpers'

const PostCard = ({ post }:any) => {
    const navigate = useNavigate();
    
    const getGenreSelections = (genres:any) => {
        let genreString = '';
        genres.map((x: Genres) => genreString += capitalize(x.genre) + ', ');
        genreString = genreString.slice(0, -2);
        return genreString;
    }

    const getInstrumentSelections = (instruments:any) => {
        let instrumentString = '';
        instruments.map((x: any) => instrumentString += capitalize(x.name) + ', ');
        instrumentString = instrumentString.slice(0, -2);
        return instrumentString;
    }
    
    const handleNavigateProfile = async () => {
        const res = await fetch( `/api/profiles/${post.owner_user_id}/`,{
           method: 'GET',
           headers: {
               'Content-type': 'application/json',
               'Authorization': `JWT ${localStorage.getItem('access')}`
           }
       })
       const resJSON = await res.json()
       
       navigate(`/profile/${post.owner_user_id}`, {state: {resJSON}});
       
   }

    return (
        <div className='post-card' >
            <div className="post-card-title">
                <h3 onClick={()=> navigate(`/post/${post.id}`, {state: {'resJSON': post}})}>{post.title}</h3>
                <h4 onClick={handleNavigateProfile}>{post.owner_first_name} {post.owner_last_name}</h4>
            </div>
            <hr />
            <div className="post-card-content">
                <div className="post-card-content-left">
                    <span>Genres: {getGenreSelections(post.genres)}</span>
                    <span>Instruments: {getInstrumentSelections(post.instruments)}</span>
                    <span id='card-content-seeking'>Seeking: {capitalize(post.seeking)}</span>
                </div>
                <div className="post-card-content-right">
                    <span>{post.city}, {post.state} {post.zipcode}</span>
                    <span>{post.comments.length} {post.comments.length === 1? 'comment': 'comments'}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard