import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import "../globalStyle.css"
import './NewPostPage.css'
import { Profile } from '../../types'
import { useNavigate } from 'react-router-dom'

import Dropdown from 'react-dropdown'

const NewPostPage = () => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const [postTitle, setPostTitle] = useState('');
    const [seeking, setSeeking] = useState('');
    const [postContent, setPostContent] = useState('');
    const [profile, setProfile] = useState<Profile | any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
          ref.current.style.height = "auto";
          ref.current.style.height = `${e.target.scrollHeight - 16}px`;
        }
      };

    const handleChange = (event:any) => {
        const {name, value} = event.target;
        switch (name) {
            case 'title':
                setPostTitle(value);
                break
            case 'post-content':
                setPostContent(value);
        }
    }

    const handleSeekingChange = (option:any) => {
        setSeeking(option.value === 'Musicians'? 'musicians': 'bands');
    }

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const valid = checkRequirements()
        if (!valid) return
        const data = {
            "title": postTitle,
            "seeking": uncapitalize(seeking),
            "content": postContent,
            "zipcode": profile.zipcode,
            "instruments": seeking === 'musicians'? profile.seeking: profile.instruments.map((inst:any) => inst.instrument),
            "genres": profile.genres
        }
        
        const res = await fetch(`/api/posts/`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
          })
        const resJSON = await res.json();
        if (res.ok){
            navigate(`/post/${resJSON.id}`, {state: {resJSON}});
        }
    }

    const handleError = (errMsg:string) => {
        setErrorMessage(errMsg)
        setTimeout(() =>{
            setErrorMessage('');
        }, 4000)
    }

    const checkRequirements = () => {
        if (!postTitle) {
            handleError('Missing post title')
            return false
        }
        if (!seeking) {
            handleError('Missing seeking selection')
            return false
        }
        if (!postContent) {
            handleError('Missing post content')
            return false
        }
        if (!profile.first_name || !profile.last_name) {
            handleError('Missing full name from profile')
            return false
        }
        if (!profile.zipcode) {
            handleError('Missing zipcode from profile')
            return false
        }
        if (profile.genres.length === 0) {
            handleError('Missing genre selections from profile')
            return false
        }
        if (seeking === 'Band to join' && profile.instruments.length === 0) {
            handleError('Missing profile instruments for seeking band')
            return false
        }
        if (seeking === 'Musicians' && profile.seeking.length === 0) {
            handleError('Missing profile seeking options when searching for musicians')
            return false
        }

        // Profile is valid
        return true
    }

    const uncapitalize = (string: string) => {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    const retrieveProfile = () => {
        const loggedProfileString = localStorage.getItem('loggedJamSessionProfile');
        let profileJSON = {};

        if (loggedProfileString) {
            profileJSON = JSON.parse(loggedProfileString? loggedProfileString: '');
            setProfile(profileJSON);
        }
    }

    useEffect(() => {
      retrieveProfile();
    },[])

    return (
        <div className="wrapper">
            <div className="new-post-form-wrapper">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit} noValidate >
                    <div className="title">
                        <label htmlFor="title">Post Title</label>
                        <input type='text' name='title' id='post-title' className='title-input' onChange={handleChange}/>
                    </div>
                    <div className="seeking">
                        <label htmlFor="seeking">Seeking</label>
                        <Dropdown options={['Musicians', 'Band to join']} className='seeking-dropdown' onChange={handleSeekingChange}/>
                    </div>
                    <div className="post-content">
                        <label htmlFor="post-content">Post Content</label>
                        <textarea
                            name="post-content" 
                            id="post-content"
                            ref={ref}
                            rows={1}
                            placeholder="Enter text here..."
                            onInput={handleInput}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="error-message">
                        {errorMessage? <span className='error-message'>{errorMessage}</span>:<></>}
                    </div>
                    <div className="post-submit">
                        <button className='post-submit-button'>Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPostPage