import React, { useState } from 'react';
import { Profile } from '../../types';
import './ProfilePictureModal.css'

const ProfilePictureModal = ({setPicture}:any) => {
    const [modal, setModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const toggleModal = () => {
        setModal(!modal)
    }

    const getProfile = async () => {
        const res = await fetch('/api/profiles/',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          })
          const jsonRes = await res.json()
          
          if (res.status === 200) {
                window.localStorage.setItem('loggedJamSessionProfile', JSON.stringify(jsonRes))
          }
    }

    const handleFileChange = (event:any) => {
        setProfilePicture(event.target.files[0])
    }

    const handleFileUpload = async () => {
        if (!profilePicture) return;
        const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
        let profileJSON:Profile = JSON.parse(loggedProfileString? loggedProfileString: '')
        
        const data = new FormData()
        data.append('image_file', profilePicture)

        if (profileJSON && profileJSON.profile_picture) {
            const res = await fetch(`/api/profile-pics/${profileJSON.profile_picture.id}/`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            const resJSON = await res.json()
            setPicture(resJSON.image_file);
        }
        if (profileJSON && !profileJSON.profile_picture){
            const res = await fetch('/api/profile-pics/', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
            
            const resJSON = await res.json()
            setPicture(resJSON.image_file);
        }
        await getProfile();
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <button className="btn-modal" onClick={toggleModal} id="edit-profile-picture-button">
                Edit
            </button>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h2>Upload a profile picture</h2>
                        <input type="file" onChange={handleFileChange} id="upload-picture-file"/>
                        <button onClick={handleFileUpload} className='upload-file-button'>Upload</button>
                        <button className="close-modal" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
            </div>
            )}
        </>
    )
}

export default ProfilePictureModal