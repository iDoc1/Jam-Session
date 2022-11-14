import React, { useEffect, useState, useCallback } from 'react';
import { Profile } from '../../types';
import './UploadMusicModal.css'

const UploadMusicModal = ({setPicture}:any) => {
    const [modal, setModal] = useState(false);
    const [currentProfileMusic, setCurrentProfileMusic] = useState([]);
    const [musicSample, setMusicSample] = useState<any>(null);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        setMusicSample(event.target.files[0])

    }

    const handleFileUpload = async () => {
        // console.log('sample 1:', musicSample1,'sample 2:', musicSample2,'sample 3:', musicSample3);
        console.log(currentProfileMusic);
        
        if (!musicSample) return;

        // const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
        // let profileJSON:Profile = JSON.parse(loggedProfileString? loggedProfileString: '')
        
        const songMatch = currentProfileMusic.filter((x:any) => x.title === musicSample.name)

        if (songMatch.length > 0) {
            setErrorMessage('Song already exists in your samples')
            setTimeout(() => {
                setErrorMessage('');
            }, 5000)
            return
        }

        const data = new FormData()
        data.append('title', musicSample.name )
        data.append('music_file', musicSample)

        const res = await fetch('/api/music-samples/', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const resJSON = await res.json()
        console.log(resJSON);

        if (res.ok){
            setSuccess(true)
            
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
            
        }
        setMusicSample(null);
        await getProfile();
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    const getCurrentMusic = useCallback(() => {
        const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
        let profileJSON:Profile = JSON.parse(loggedProfileString? loggedProfileString: '')
        if (profileJSON?.music_samples.length > 0){
            setCurrentProfileMusic(profileJSON?.music_samples)
        }

    },[])

    useEffect(() => {
      getCurrentMusic();
    },[getCurrentMusic])
    return (
        <>
            <button className="btn-music-modal" onClick={toggleModal} id="edit-profile-picture-button">
                Edit
            </button>
            {modal && (
                <div className="music-modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h2>Upload music samples</h2>
                        <div className="music-inputs">
                            <input name="music-sample-1" type="file" onChange={handleFileChange} id="upload-picture-file"/>
                        </div>
                        <div className='music-modal-message'>
                            {success? <span className='success-message'>File successfully uploaded</span>:<></>}
                            {errorMessage? <span className='error-message'>{errorMessage}</span>:<></>}
                        </div>
                        <button onClick={handleFileUpload} className='music-upload-file-button'>Upload</button>
                        <button className="close-modal" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
            </div>
            )}
        </>
    )
}

export default UploadMusicModal