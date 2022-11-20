import React from 'react'
import './PostCard.css'

const PostCard = () => {
  return (
    <div className='post-card'>
        <div className="post-card-title">
            <h3>Drummer looking for group</h3>
            <h4>Nick Bowden</h4>
        </div>
        <hr />
        <div className="post-card-content">
            <div className="post-card-content-left">
                <span>Genre: Rock, Metal, R&B</span>
                <span>Instrument: Drums, Bass guitar, Backup vocals</span>
                <span>Seeking: Band to join</span>
            </div>
            <div className="post-card-content-right">
                <span>Seattle, WA 99999</span>
                <span>1 comment</span>
            </div>
        </div>
    </div>
  )
}

export default PostCard