import React, { useEffect, useState, useCallback } from 'react';
import './UploadMusicModal.css'

const UploadMusicModal = ({playlist, setPlaylist}:any) => {
    const [modal, setModal] = useState(false);
    const [musicSample, setMusicSample] = useState<any>(null);
    const [success, setSuccess] = useState('');
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
        if (!musicSample) return;
        
        const songMatch = playlist.filter((x:any) => x.title === musicSample.name)

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

        if (res.ok){
            setSuccess('File successfully uploaded')
            
            setTimeout(() => {
                setSuccess('')
            }, 5000)
            
        }

        const currentMusic = await fetch('/api/music-samples/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const currentMusicJSON = await currentMusic.json()
        setPlaylist(currentMusicJSON)
        setMusicSample(null);
        await getProfile();
    }

    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    const getCurrentMusic = useCallback(async () => {
        const currentMusic = await fetch('/api/music-samples/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const currentMusicJSON = await currentMusic.json()
        setPlaylist(currentMusicJSON)

    },[setPlaylist])

    const handleDeleteMusic = async () => {
        if (window.confirm("Are you sure? This will delete all current music samples")){
            let noErrors = true;
            playlist.map(async (x:any) => {
                const res = await fetch(`/api/music-samples/${x.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`
                    }
                })
                if (res.ok) {
                    noErrors = noErrors && true
                }
                else {
                    noErrors = false
                }
            });

            if (noErrors) {
                setSuccess('Files successfully deleted')
            
                setTimeout(() => {
                    setSuccess('')
                }, 5000)
       
                setPlaylist([])
                await getProfile();
                setMusicSample(null);
            }    
        }
    }

    useEffect(() => {
      getCurrentMusic();
    },[getCurrentMusic])

    return (
        <>
            <button className="btn-music-modal" onClick={toggleModal} id="edit-music-button">
                Edit
            </button>
            {modal && (
                <div className="music-modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="music-modal-content">
                        <h2>Edit music samples</h2>
                        <div className="music-inputs">
                            <input name="music-sample-1" type="file" onChange={handleFileChange} id="upload-music-file"/>
                        </div>
                        <div className='music-modal-message'>
                            {success? <span className='success-message'>{success}</span>:<></>}
                            {errorMessage? <span className='error-message'>{errorMessage}</span>:<></>}
                        </div>
                        <button onClick={handleFileUpload} className='music-upload-file-button'>Upload</button>
                        <button className='music-upload-delete-all' onClick={handleDeleteMusic}>Delete all samples</button>
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