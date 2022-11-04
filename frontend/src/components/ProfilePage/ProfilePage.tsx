import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import ProfilePic from '../../assets/default-profile.png'
import Player from '../MusicPlayer/Player'
import { setInterval } from 'timers/promises'

interface Gender {
    id:number,
    gender:string
}

interface Genres{
    id:number,
    genre:string
}

interface Instrument{
    id:number,
    name:string,
    children?:any

}
interface ExperienceLevel {
    id:number,
    rank:number,
    level:string
}
interface Instruments {
    experience_level:ExperienceLevel
    instrument:Instrument,
    children?:any
}
interface CommitmentLevel{
    id: number,
    level: string,
    rank:number
}
interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    zipcode: string,
    profile_picture_url: string | null,
    birth_date: string,
    gender: Gender,
    genres: Genres[],
    instruments: Instruments[],
    level_of_commitment: CommitmentLevel,
    years_playing: number,
    join_date: string,
    seeking:string
}
interface Tokens{
    refresh:string,
    access:string
}
interface ProfileProps {
    tokens: Tokens,
    userId: number,
    userEmail:string
}

export default function ProfilePage({tokens, userId, userEmail}:ProfileProps) {
    const [profile, setProfile] = useState<Profile | undefined>(
            {
                "id": 13,
                "first_name": "Sample",
                "last_name": "Account",
                "gender": {
                    "id": 1,
                    "gender": "Man"
                },
                "birth_date": "1992-06-28",
                "zipcode": "99999",
                "profile_picture_url": null,
                "join_date": "2022-10-22T21:30:45.042693Z",
                "years_playing": 5,
                "level_of_commitment": {
                    "id": 1,
                    "level": "Moderately serious",
                    "rank": 2
                },
                "seeking": "Vocals, Guitar, Keys",
                "instruments": [
                    {
                        "instrument": {
                            "id": 5,
                            "name": "drums"
                        },
                        "experience_level": {
                            "id": 1,
                            "level": "Moderately serious",
                            "rank": 2
                        }
                    },
                    {
                        "instrument": {
                            "id": 3,
                            "name": "bass guitar"
                        },
                        "experience_level": {
                            "id": 2,
                            "level": "Intermediate",
                            "rank": 3
                        }
                    },
                    {
                        "instrument": {
                            "id": 4,
                            "name": "backup vocals"
                        },
                        "experience_level": {
                            "id": 3,
                            "level": "Beginner",
                            "rank": 4
                        }
                    }
                ],
                "genres": [
                    {
                        "id": 2,
                        "genre": "rock"
                    },
                    {
                        "id": 3,
                        "genre": "metal"
                    },
                    {
                        "id": 4,
                        "genre": "r&b"
                    }
                ]
            }
    );

    const getProfile = async () => {
        const res = await fetch('/api/profiles/',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${tokens.access}`
            }
          })
          const jsonRes = await res.json()
          
          if (res.status === 200) {
                setProfile(jsonRes[0]);
                window.localStorage.setItem('loggedJamSessionProfile', JSON.stringify(jsonRes))
          }
          

    }

    const getAge = (dateString:any) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const formatDate = (dateString:any) => {
      return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    }

    const getGenres = () => {
        let genreString = '';

        profile?.genres.map(g => genreString += (g.genre.charAt(0).toUpperCase() + g.genre.slice(1)) + ', ')
        
        if (genreString.slice(-2) === ', '){
            genreString = genreString.slice(0,-2)
        }
        
        return genreString
    }

    const getInstruments = () => {
        let instrumentString = '';

        let instrumentList = profile?.instruments
    
        instrumentList?.map(inst => instrumentString += (inst.instrument.name.charAt(0).toUpperCase() + inst.instrument.name.slice(1)) + ', ')
        if (instrumentString.slice(-2) === ', '){
            instrumentString = instrumentString.slice(0,-2)
        }

        return instrumentString
    }
    useEffect(() => {
        const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');

        if (!loggedProfileString) {
            getProfile();
        }
        else {
            
            const profileJSON = JSON.parse(loggedProfileString);
            setProfile(profileJSON[0])
        }
        

    },[])

    return (
        <div className='profile'>
            <div className="profile-container">
                <div className='user-banner'>
                    <div className="banner-name-city">
                        <h1>{profile?.first_name} {profile?.last_name}</h1>
                        <h3>Musician in {profile?.zipcode}</h3>
                    </div>
                    <div className="banner-socials">
                        <h1>Socials</h1>
                    </div>
                </div>
                <div className='user-about'>
                    <img src={ProfilePic} alt="" className='profile-picture'/>
                    <div className="user-info">
                        <div>
                            <h3>City, State, {profile?.zipcode}</h3>
                            <h3>Genres:</h3>
                            <p>{getGenres()}</p>
                            <h3>Instruments:</h3> 
                            <p>{getInstruments()}</p>
                            <button><a href={`mailto:${userEmail}`}>Contact</a></button>
                        </div>
                        <div>
                            <h3>{getAge(profile?.birth_date)} Year old {profile?.gender.gender}</h3>
                            <h3>Years playing music:</h3> 
                            <p>{profile?.years_playing}</p>
                            <h3>Level of commitment:</h3>
                            <p>{profile?.level_of_commitment.level}</p>
                            <h3>Member since:</h3>
                            <p>{formatDate(profile?.join_date)}</p>
                        </div>
                    </div>
                </div>
                <div className="user-music">
                    <div className="music-player">
                        <h2>Music Sample</h2>
                        <Player />
                    </div>
                    <div className="music-info">
                        <div className="music-seeking">
                            <h3>Seeking</h3>
                            <p>{profile?.seeking}</p>
                        </div>
                        <div className="music-instruments">
                            <h3>Instrument Experience</h3>
                            <ul>
                                {profile?.instruments.map(inst => 
                                    <li key={inst.instrument.id}><span className='instrument-list'>{inst.instrument.name.charAt(0).toUpperCase() + inst.instrument.name.slice(1)}:</span> <span>{inst.experience_level.level}</span></li>
                                    
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
