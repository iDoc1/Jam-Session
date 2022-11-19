import React from 'react'
import './Comment.css'

const Comment = ({comment}:any) => {
    return (
        <div className='individual-comment'>
            <h3>{comment.user_first_name} {comment.user_last_name}</h3>
            {comment.content}
        </div>
    )
}

export default Comment