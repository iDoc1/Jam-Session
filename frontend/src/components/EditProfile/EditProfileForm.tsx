import React, { useEffect, useState } from "react";
import "../globalStyle.css"
import "./EditProfileForm.css"
import { Profile, Gender, CommitmentLevel, Genres, Instrument, Instruments, ExperienceLevel, SocialMedia } from '../../types'
import Dropdown from 'react-dropdown'
import { useNavigate } from 'react-router-dom';
import { getValue } from "@testing-library/user-event/dist/utils";



/*
{
    "first_name": "Ian",
    "last_name": "Docherty",
    "gender": {
        "id": 2,
        "gender": "Man"
    },
    "birth_date": "1993-07-18",
    "zipcode": "98102",
    "years_playing": 5,
    "level_of_commitment": {
        "id": 2,
        "level": "Moderately serious",
        "rank": 2
    },
    "seeking": "A cool band to play with",
    "instruments": [
        {
            "instrument": {
                "id": 3,
                "name": "cello"
            },
            "experience_level": {
                "id": 2,
                "level": "Moderately serious",
                "rank": 2
            }
        }
    ],
    "genres": [
        {
            "id": 1,
            "genre": "classical"
        }
    ]
} 
*/
function EditProfile() {
    const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
    const profileJSON = JSON.parse(loggedProfileString? loggedProfileString: '');
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile | any>(profileJSON);

    const [genderOptions, setGenderOptions] = useState<Gender[]>([]);
    const [commitmentOptions, setCommitmentOptions] = useState<CommitmentLevel[]>([]);
    const [genreOptions, setGenreOptions] = useState<Genres[]>([]);
    const [genreSelection, setGenreSelection] = useState<any>([]);
    const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);
    const [experienceLevelOptions, setExperienceLevelOptions] = useState<ExperienceLevel[]>([]);
    const [instrument1, setInstrument1] = useState(profile?.instruments[0]? profile?.instruments[0]: {});
    const [instrument2, setInstrument2] = useState(profile?.instruments[1]? profile?.instruments[1]: {});
    const [instrument3, setInstrument3] = useState(profile?.instruments[2]? profile?.instruments[2]: {});

    const [socialMediaLinks, setSocialMediaLinks] = useState([]);

    const [facebookLink, setFacebookLink] = useState<string>('');
    const [twitterLink, setTwitterLink] = useState<string>('');
    const [instagramLink, setInstagramLink] = useState<string>('');
    const [bandcampLink, setBandcampLink] = useState<string>('');

    const handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        switch(name) {
            case'years_playing':
                if(!value) {
                    setProfile({...profile, [name]: 0});

                } else{
                    setProfile({...profile, [name]: parseInt(value)});
                }
                break
            default:
                setProfile({...profile, [name]: value})
                break
        }
    }

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const res = await fetch(`/api/profiles/${localStorage.getItem('loggedJamSessionUser')}/`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(profile)
          })
        const resJSON = await res.json()

        if (res.ok) {
            saveSocialLinks();
            localStorage.setItem('loggedJamSessionProfile', JSON.stringify(resJSON))
            navigate('/profile');
        }
        // const resJSON = await res.json()
        // console.log(resJSON)
    }
   

    const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const uncapitalize = (string: string) => {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    const getGenderOptions = async () => {
        const res = await fetch('/api/genders/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json()
        setGenderOptions(resJSON)
    }

    const changeGender = (option:any) => {
        let optionObject = genderOptions.filter(x => x.gender === option.value)[0]
        setProfile({...profile, "gender": optionObject});
    }

    const getCommitmentOptions = async () => {
        const res = await fetch('/api/commitment-levels/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json()
        setCommitmentOptions(resJSON)
    }

    const changeCommitment = (option:any) => {
        let optionObject = commitmentOptions.filter(x => x.level === option.value)[0]
        setProfile({...profile, "level_of_commitment": optionObject});
    }

    const getGenreOptions = async () => {
        const res = await fetch('/api/genres/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json()
        setGenreOptions(resJSON)
    }

    const addGenreSelection = (option:any) => {
        if (!genreSelection.includes(option.value)) {
            setGenreSelection([...genreSelection, option.value]);

            const genreObject = genreOptions.filter(x => x.genre === uncapitalize(option.value))[0];
            setProfile({...profile, "genres": [...profile.genres, genreObject]});
        }
    }

    const getGenreSelections = () => {
        let genreString = '';
        profile.genres.map((x: Genres) => genreString += capitalize(x.genre) + ', ');
        genreString = genreString.slice(0, -2);
        return genreString;
    }

    const clearGenreSelections = (e:any) => {
        e.preventDefault()
        setGenreSelection([]);
        setProfile({...profile, "genres": []});
    }

    const getInstrumentOptions = async () => {
        const res = await fetch('/api/instruments/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json();
        setInstrumentOptions(resJSON);
    }

    const getExperienceOptions = async () => {
        const res = await fetch('/api/experience-levels/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json();
        setExperienceLevelOptions(resJSON);
    }

    const changeInstrument1 = (option:any) => {
        const instrumentObject = instrumentOptions.filter(x => x.name === uncapitalize(option.value))[0]
        const newInstObj = {...instrument1, "instrument": instrumentObject}
        const currentSelection = instrument1;
        setInstrument1(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeOldChoice = profile.instruments.filter((i: Instruments) => i.instrument.name !== currentSelection.instrument.name)
            const removeDuplicateInstruments = removeOldChoice.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
        
    }
    const changeExperience1 = (option:any) => {
        const experienceObject = experienceLevelOptions.filter(x => x.level === option.value)[0]
        const newInstObj = {...instrument1, "experience_level": experienceObject}
        setInstrument1(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeDuplicateInstruments = profile.instruments.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
    }

    const changeInstrument2 = (option:any) => {
        const instrumentObject = instrumentOptions.filter(x => x.name === uncapitalize(option.value))[0]
        const newInstObj = {...instrument2, "instrument": instrumentObject}
        const currentSelection = instrument2;
        setInstrument2(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeOldChoice = profile.instruments.filter((i: Instruments) => i.instrument.name !== currentSelection.instrument.name)
            const removeDuplicateInstruments = removeOldChoice.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
        
    }
    const changeExperience2 = (option:any) => {
        const experienceObject = experienceLevelOptions.filter(x => x.level === option.value)[0]
        const newInstObj = {...instrument2, "experience_level": experienceObject}
        setInstrument2(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeDuplicateInstruments = profile.instruments.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
    }

    const changeInstrument3 = (option:any) => {
        const instrumentObject = instrumentOptions.filter(x => x.name === uncapitalize(option.value))[0]
        const newInstObj = {...instrument3, "instrument": instrumentObject}
        const currentSelection = instrument3;
        setInstrument3(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeOldChoice = profile.instruments.filter((i: Instruments) => i.instrument.name !== currentSelection.instrument.name)
            const removeDuplicateInstruments = removeOldChoice.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
        
    }
    const changeExperience3 = (option:any) => {
        const experienceObject = experienceLevelOptions.filter(x => x.level === option.value)[0]
        const newInstObj = {...instrument3, "experience_level": experienceObject}
        setInstrument3(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            const removeDuplicateInstruments = profile.instruments.filter((i: Instruments) => i.instrument.name !== newInstObj.instrument.name)
            setProfile({...profile, "instruments": [...removeDuplicateInstruments, newInstObj]})
        }
    }

    const getSocialLinks = async () => {
        const res = await fetch('/api/social-media/', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
          });
        const resJSON = await res.json();
        setSocialMediaLinks(resJSON);

        const facebookObject:SocialMedia = resJSON.filter((s:SocialMedia) => s.social_media_site === 'facebook')[0]
        if (facebookObject) {
            setFacebookLink(facebookObject.social_media_link);
        }

        const twitterObject:SocialMedia = resJSON.filter((s:SocialMedia) => s.social_media_site === 'twitter')[0]
        if (twitterObject) {
            setTwitterLink(twitterObject.social_media_link);
        }

        const instagramObject:SocialMedia = resJSON.filter((s:SocialMedia) => s.social_media_site === 'instagram')[0]
        if (instagramObject) {
            setInstagramLink(instagramObject.social_media_link);
        }

        const bandcampObject:SocialMedia = resJSON.filter((s:SocialMedia) => s.social_media_site === 'bandcamp')[0]
        if (bandcampObject) {
            setBandcampLink(bandcampObject.social_media_link);
        }
    }

    const handleSocialChange = async (event:any) => {
        event.preventDefault();
        const {name, value} = event.target;
        switch (name){
            case 'facebook':
                setFacebookLink(value)
                break
            case 'twitter':
                setTwitterLink(value)
                break
            case 'instagram':
                setInstagramLink(value)
                break
            case 'bandcamp':
                setBandcampLink(value)
                break
            default:
                break
        }
    }

    const saveSocialLinks = async () => {
        console.log(socialMediaLinks);
        
        const facebookObject:SocialMedia = socialMediaLinks.filter((s:SocialMedia) => s.social_media_site === 'facebook')[0]
        const twitterObject:SocialMedia = socialMediaLinks.filter((s:SocialMedia) => s.social_media_site === 'twitter')[0]
        const instagramObject:SocialMedia = socialMediaLinks.filter((s:SocialMedia) => s.social_media_site === 'instagram')[0]
        const bandcampObject:SocialMedia = socialMediaLinks.filter((s:SocialMedia) => s.social_media_site === 'bandcamp')[0]
       
        if (!facebookLink && facebookObject) {
            await fetch(`/api/social-media/${facebookObject.id}/`, {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            });
        }
        else if (facebookLink && facebookObject) {
            const body = {
                "social_media_site": "facebook",
                "social_media_link": facebookLink
            }
            await fetch(`/api/social-media/${facebookObject.id}/`, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });
        }
        else if (facebookLink && !facebookObject) {
            const body = {
                "social_media_site": "facebook",
                "social_media_link": facebookLink
            }
            await fetch(`/api/social-media/`, {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });            
        }
       
        if (!twitterLink && twitterObject) {
            await fetch(`/api/social-media/${twitterObject.id}/`, {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            });
        }
        else if (twitterLink && twitterObject) {
            const body = {
                "social_media_site": "twitter",
                "social_media_link": twitterLink
            }
            await fetch(`/api/social-media/${twitterObject.id}/`, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });
        }
        else if (twitterLink && !twitterObject) {
            const body = {
                "social_media_site": "twitter",
                "social_media_link": twitterLink
            }
            await fetch(`/api/social-media/`, {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });            
        }
       
        if (!instagramLink && instagramObject) {
            await fetch(`/api/social-media/${instagramObject.id}/`, {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            });
        }
        else if (instagramLink && instagramObject) {
            const body = {
                "social_media_site": "instagram",
                "social_media_link": instagramLink
            }
            await fetch(`/api/social-media/${instagramObject.id}/`, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });
        }
        else if (instagramLink && !instagramObject) {
            const body = {
                "social_media_site": "instagram",
                "social_media_link": instagramLink
            }
            await fetch(`/api/social-media/`, {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });            
        }
       
        if (!bandcampLink && bandcampObject) {
            await fetch(`/api/social-media/${bandcampObject.id}/`, {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            });
        }
        else if (bandcampLink && bandcampObject) {
            const body = {
                "social_media_site": "bandcamp",
                "social_media_link": bandcampLink
            }
            await fetch(`/api/social-media/${bandcampObject.id}/`, {
                method: 'PUT',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });
        }
        else if (bandcampLink && !bandcampObject) {
            const body = {
                "social_media_site": "bandcamp",
                "social_media_link": bandcampLink
            }
            await fetch(`/api/social-media/`, {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `JWT ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(body)
            });            
        }
    }

    useEffect(() => {
        getGenderOptions();
        getCommitmentOptions();
        getGenreOptions();
        getInstrumentOptions();
        getExperienceOptions();
        getSocialLinks();
    },[])

    return (
    <div className="wrapper">
        <div className="edit-form-wrapper">
            <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type='first_name' name='first_name' id='edit-profile-first' onChange={handleChange} value={profile.first_name} />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type='last_name' name='last_name' id='edit-profile-last' onChange={handleChange} value={profile.last_name}/>
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Dropdown options={genderOptions.map((g: Gender) => g.gender)} placeholder={profile?.gender.gender} onChange={changeGender}/>
            </div>
            <div className="form-group">
                <label htmlFor="birth_date">Birth Date</label>
                <input type='date' name='birth_date' id='edit-profile-birth-date' onChange={handleChange} value={profile.birth_date}/>
            </div>
            <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input type='zipcode' name='zipcode' id='edit-profile-zipcode' onChange={handleChange} value={profile.zipcode}/>
            </div>
            <div className="form-group">
                {/* Added for spacing */}
            </div>
            <div className="form-group">
                <label htmlFor="years_playing">Years playing music</label>
                <input type='string' name='years_playing' id='edit-profile-years-playing' onChange={handleChange} value={profile.years_playing}/>
            </div>
            <div className="form-group">
                <label htmlFor="level_of_commitment">Level of commitment</label>
                <Dropdown options={commitmentOptions.map((c : CommitmentLevel) => c.level)} placeholder={profile?.level_of_commitment.level} onChange={changeCommitment}/>
            </div>
            <div className="form-group">
                <label htmlFor="genres">Genre</label>
                <Dropdown options={genreOptions.map((g: Genres) => capitalize(g.genre))} onChange={addGenreSelection}/>
                <p>Select up to 3 instruments below</p>
            </div>
            <div className="form-group">
                <label htmlFor="birth_date">Genre Selection</label>
                <p>{getGenreSelections()}</p>
                <button onClick={clearGenreSelections}>Clear Selections</button>
            </div>
            <div className="form-group">
                <label htmlFor="instruments">Instrument</label>
                <Dropdown options={instrumentOptions.map((i: Instrument) => capitalize(i.name))} placeholder={profile?.instruments[0]? capitalize(profile?.instruments[0].instrument.name): ''} onChange={changeInstrument1}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience_level">Experience Level</label>
                <Dropdown  options={experienceLevelOptions.map((e: ExperienceLevel) => e.level)} placeholder={profile?.instruments[0]? profile?.instruments[0].experience_level.level: 'Select...'} onChange={changeExperience1} />
            </div>
            <div className="form-group">
                <label htmlFor="instruments">Instrument</label>
                <Dropdown options={instrumentOptions.map((i: Instrument) => capitalize(i.name))} placeholder={profile?.instruments[1]? capitalize(profile?.instruments[1].instrument.name): 'Select...'} onChange={changeInstrument2}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience_level">Experience Level</label>
                <Dropdown  options={experienceLevelOptions.map((e: ExperienceLevel) => e.level)} placeholder={profile?.instruments[1]? profile?.instruments[1].experience_level.level: 'Select...'} onChange={changeExperience2} />
            </div>
            <div className="form-group">
                <label htmlFor="instruments">Instrument</label>
                <Dropdown options={instrumentOptions.map((i: Instrument) => capitalize(i.name))} placeholder={profile?.instruments[2]? capitalize(profile?.instruments[2].instrument.name): 'Select...'} onChange={changeInstrument3}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience_level">Experience Level</label>
                <Dropdown  options={experienceLevelOptions.map((e: ExperienceLevel) => e.level)} placeholder={profile?.instruments[2]? profile?.instruments[2].experience_level.level: 'Select...'} onChange={changeExperience3} />
            </div>

            <div className="form-group">
                <label htmlFor="facebook">Facebook</label>
                <input type='facebook' name='facebook' id='edit-profile-facebook' onChange={handleSocialChange} value={facebookLink} />
            </div>
            <div className="form-group">
                <label htmlFor="twitter">Twitter</label>
                <input type='twitter' name='twitter' id='edit-profile-twitter' onChange={handleSocialChange} value={twitterLink} />
            </div>            <div className="form-group">
                <label htmlFor="instagram">Instagram</label>
                <input type='instagram' name='instagram' id='edit-profile-instagram' onChange={handleSocialChange} value={instagramLink} />
            </div>
            <div className="form-group">
                <label htmlFor="bandcamp">Bandcamp</label>
                <input type='bandcamp' name='bandcamp' id='edit-profile-bandcamp' onChange={handleSocialChange} value={bandcampLink} />
            </div>

            <button id='save-changes-button'>Save Changes</button>
            </form>
        </div>
    </div>
    );
};
export default EditProfile
