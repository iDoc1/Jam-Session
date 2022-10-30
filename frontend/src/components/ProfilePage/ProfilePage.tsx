import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import ProfilePic from '../../assets/default-profile.png'

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
    first_name: string,
    last_name: string,
    zipcode: string,
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
    const [profile, setProfile] = useState<Profile | undefined>(undefined);

    const getProfile = async () => {
        const res = await fetch('http://localhost:8000/api/profiles/',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${tokens.access}`
            }
          })
          const jsonRes = await res.json()
          setProfile(jsonRes[0]);
          console.log(jsonRes[0]);
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

    useEffect(() => {
        getProfile();
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
                            <h3>City, State, {profile?.zipcode} | {getAge(profile?.birth_date)} Year old {profile?.gender.gender}</h3>
                            <h3>Genres: {profile?.genres[0].genre}</h3>
                            <h3>Instruments: {profile?.instruments[0].instrument.name}</h3>
                            <button><a href={`mailto:${userEmail}`}>Contact</a></button>
                        </div>
                        <div>
                            <h3>Years playing music: {profile?.years_playing}</h3>
                            <h3>Level of commitment: {profile?.level_of_commitment.level}</h3>
                            <h3>Member since: {formatDate(profile?.join_date)}</h3>
                        </div>
                    </div>
                </div>
                <div className="user-music">
                    <div className="music-player">
                        <h3>Music Sample</h3>
                    </div>
                    <div className="music-info">
                        <div className="music-seeking">
                            <h3>Seeking</h3>
                            <p>{profile?.seeking}</p>
                        </div>
                        <div className="music-instruments">
                            <h3>Instrument Experience</h3>
                            <ul>
                                <li><span className='instrument-list'>{profile?.instruments[0].instrument.name}:</span> <span>{profile?.instruments[0].experience_level.level}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
