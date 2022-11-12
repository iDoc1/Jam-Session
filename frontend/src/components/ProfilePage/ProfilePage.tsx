import React, { useEffect, useState, useCallback } from 'react'
import './ProfilePage.css'
import ProfilePic from '../../assets/default-profile.png'
import facebookIcon from '../../assets/icons/facebook.png'
import twitterIcon from '../../assets/icons/twitter.png'
import instagramIcon from '../../assets/icons/instagram.png'
import bandcampIcon from '../../assets/icons/bandcamp.png'
import Player from '../MusicPlayer/Player'
import { useNavigate } from 'react-router-dom';
import { Profile, SocialMedia } from '../../types'


export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | undefined>(undefined);

    const [facebookLink, setFacebookLink] = useState<string>('');
    const [twitterLink, setTwitterLink] = useState<string>('');
    const [instagramLink, setInstagramLink] = useState<string>('');
    const [bandcampLink, setBandcampLink] = useState<string>('');

    const navigate = useNavigate();

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
                setProfile(jsonRes[0]);
                window.localStorage.setItem('loggedJamSessionProfile', JSON.stringify(jsonRes))
          }
    }

    const getAge = (dateString:string) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const formatDate = (dateString:string) => {
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

    const getSeeking = () => {
        let seekingString = '';

        profile?.seeking.map(s => seekingString += (s.name.charAt(0).toUpperCase() + s.name.slice(1)) + ', ')
        
        if (seekingString.slice(-2) === ', '){
            seekingString = seekingString.slice(0,-2)
        }
        
        return seekingString
    }

    const getSocialLinks = useCallback(async () => {
        const res = await fetch('/api/social-media/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json();
        console.log('profile page',resJSON);
          
        parseSocials(resJSON);
    },[])

    const parseSocials = (obj:any) => {
        const facebookObject:SocialMedia = obj.filter((s:SocialMedia) => s?.social_media_site === 'facebook')[0]
        if (facebookObject) {
            setFacebookLink(facebookObject.social_media_link);
        }

        const twitterObject:SocialMedia = obj.filter((s:SocialMedia) => s?.social_media_site === 'twitter')[0]
        if (twitterObject) {
            setTwitterLink(twitterObject.social_media_link);
        }

        const instagramObject:SocialMedia = obj.filter((s:SocialMedia) => s?.social_media_site === 'instagram')[0]
        if (instagramObject) {
            setInstagramLink(instagramObject.social_media_link);
        }

        const bandcampObject:SocialMedia = obj.filter((s:SocialMedia) => s?.social_media_site === 'bandcamp')[0]
        if (bandcampObject) {
            setBandcampLink(bandcampObject.social_media_link);
        }
    }
    useEffect(() => {
        const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');

        if (!loggedProfileString) {
            getProfile();
            console.log('no string found?');
            
            return
        }

        if (!profile) {
            const profileJSON = JSON.parse(loggedProfileString);
            setProfile(profileJSON)
        }
        
        getSocialLinks();
    },[profile, getSocialLinks])

    return (
        <div className='profile'>
            <div className="profile-container">
                <div className='user-banner'>
                    <div className='left-side-banner'>
                        <div className="banner-name-city">
                            <h1>{profile?.first_name} {profile?.last_name}</h1>
                            <h3>Musician in {profile?.zipcode}</h3>
                        </div>
                        <button onClick={()=>navigate('/profile/edit')}>Edit Profile</button>
                    </div>
                    <div className="banner-socials">
                        {
                            facebookLink?
                                <a href={facebookLink}>
                                    <img src={facebookIcon} alt="" />
                                </a>
                                :null
                        }
                        {
                            twitterLink?
                                <a href={twitterLink}>
                                    <img src={twitterIcon} alt="" />
                                </a>
                                :null
                        }
                        {
                            instagramLink?
                                <a href={instagramLink}>
                                    <img src={instagramIcon} alt="" />
                                </a>
                                :null
                        }
                        {
                            bandcampLink?
                                <a href={bandcampLink}>
                                    <img src={bandcampIcon} alt="" />
                                </a>
                                :null
                        }
                    </div>
                </div>
                <div className='user-about'>
                    <img src={ProfilePic} alt="" className='profile-picture'/>
                    <div className="user-info">
                        <div>
                            <h3>{`${profile?.city}, ${profile?.state}`}, {profile?.zipcode}</h3>
                            <h3>Genres:</h3>
                            <p>{getGenres()}</p>
                            <h3>Instruments:</h3> 
                            <p>{getInstruments()}</p>
                            <button><a href={`mailto:${localStorage.getItem('loggedJamSessionEmail')}`}>Contact</a></button>
                        </div>
                        <div>
                            <h3>{profile?.birth_date? getAge(profile?.birth_date):''} Year old {profile?.gender.gender}</h3>
                            <h3>Years playing music:</h3> 
                            <p>{profile?.years_playing}</p>
                            <h3>Level of commitment:</h3>
                            <p>{profile?.level_of_commitment? profile.level_of_commitment.level : ''}</p>
                            <h3>Member since:</h3>
                            <p>{profile?.join_date? formatDate(profile?.join_date) : ''}</p>
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
                            <p>{getSeeking()}</p>
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
