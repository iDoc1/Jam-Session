import React from 'react'
import './PostCard.css'
import { Genres } from '../../types'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }:any) => {
    const navigate = useNavigate();
    const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
      const uncapitalize = (string: string) => {
          return string.charAt(0).toLowerCase() + string.slice(1)
      }
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

    
    return (
        <div className='post-card' onClick={()=> navigate(`/post/${post.id}`, {state: {'resJSON': post}})}>
            <div className="post-card-title">
                <h3>{post.title}</h3>
                <h4>{post.owner_first_name} {post.owner_last_name}</h4>
            </div>
            <hr />
            <div className="post-card-content">
                <div className="post-card-content-left">
                    <span>Genres: {getGenreSelections(post.genres)}</span>
                    <span>Instruments: {getInstrumentSelections(post.instruments)}</span>
                    <span>Seeking: {capitalize(post.seeking)}</span>
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