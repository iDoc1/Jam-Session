import React from 'react'
import './Comment.css'
import { useNavigate } from 'react-router-dom'
import DefaultProfilePic from '../../assets/default-profile.png'


const Comment = ({comment}:any) => {
    const navigate = useNavigate();

    const handleNavigateProfile = async () => {
         const res = await fetch( `/api/profiles/${comment.user_profile_id}/`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const resJSON = await res.json()
        
        navigate(`/profile/${comment.user_profile_id}`, {state: {resJSON}});
        
    }

    return (
        <div className='individual-comment'>
            <div className='comment-title'>
                <img src={comment.profile_pic? comment.profile_pic: DefaultProfilePic} alt="" />
                <h3 onClick={handleNavigateProfile}>{comment.user_first_name} {comment.user_last_name}</h3>
            </div>
            <span>{comment.content}</span>
        </div>
    )
}

export default Comment