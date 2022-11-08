import React, { useEffect, useState } from "react";
import "../globalStyle.css"
import "./EditProfileForm.css"
import { Profile, Gender, CommitmentLevel, Genres, Instrument, ExperienceLevel } from '../../types'
import Dropdown from 'react-dropdown'


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

    const [profile, setProfile] = useState<Profile | any>(profileJSON);

    const [genderOptions, setGenderOptions] = useState<Gender[]>([]);
    const [commitmentOptions, setCommitmentOptions] = useState<CommitmentLevel[]>([]);
    const [genreOptions, setGenreOptions] = useState<Genres[]>([]);
    const [genreSelection, setGenreSelection] = useState<any>([]);
    const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);
    const [experienceLevelOptions, setExperienceLevelOptions] = useState<ExperienceLevel[]>([]);
    const [instrument1, setInstrument1] = useState({});
    const [instrument2, setInstrument2] = useState({});
    const [instrument3, setInstrument3] = useState({});

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
        console.log(profile);
        const res = await fetch(`/api/profiles/${localStorage.getItem('loggedJamSessionUser')}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(profile)
          })
        console.log(res)

        // const resJSON = await res.json()
        // console.log(resJSON)

    }
    // const handleSubmit = async (event:any) => {
    //     event.preventDefault();
    //     if (!email || !password) {           
    //         setError('Missing Username and/or Password')
    //         setTimeout(() =>{
    //             setError('');
    //         }, 3000)
    //         return
    //     }
    //     // const response = await axios.post(
    //     //     'http://localhost:8000/auth/jwt/create/',
    //     // )
    //     const body = {
    //             "email": email,
    //             "password": password
    //         }
    //     const res = await fetch('http://localhost:8000/auth/jwt/create/', {
    //         method: 'POST',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         }
    //     })
        
    //     const jsonRes = await res.json()
        
    //     if (res.status >= 200 && res.status <= 299){
    //         window.localStorage.setItem('loggedJamSessionUser', JSON.stringify(jsonRes));
    //     }
        
    // }

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

            const genreObject = genreOptions.filter(x => x.genre === option.value.charAt(0).toLowerCase() + option.value.slice(1))[0];
            setProfile({...profile, "genres": [...profile.genres, genreObject]});
        }
    }

    const getGenreSelections = () => {
        let genreString = '';
        profile.genres.map((x: Genres) => genreString += x.genre.charAt(0).toUpperCase() + x.genre.slice(1) + ', ');
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
        const instrumentObject = instrumentOptions.filter(x => x.name === option.value.charAt(0).toLowerCase() + option.value.slice(1))[0]
        const newInstObj = {...instrument1, "instrument": instrumentObject}
        setInstrument1(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            setProfile({...profile, "instruments": [...profile.instruments, newInstObj]})
        }
        
    }
    const changeExperience1 = (option:any) => {
        const experienceObject = experienceLevelOptions.filter(x => x.level === option.value)[0]
        const newInstObj = {...instrument1, "experience_level": experienceObject}
        setInstrument1(newInstObj)
        if (Object.keys(newInstObj).length === 2) {
            setProfile({...profile, "instruments": [...profile.instruments, newInstObj]})
        }
    }

    useEffect(() => {
        getGenderOptions();
        getCommitmentOptions();
        getGenreOptions();
        getInstrumentOptions();
        getExperienceOptions();
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
                <Dropdown options={genreOptions.map((g: Genres) => (g.genre.charAt(0).toUpperCase() + g.genre.slice(1)))} onChange={addGenreSelection}/>
            </div>
            <div className="form-group">
                <label htmlFor="birth_date">Genre Selection</label>
                <p>{getGenreSelections()}</p>
                <button onClick={clearGenreSelections}>Clear Selections</button>
            </div>
            <div className="form-group">
                <label htmlFor="instruments">Instruments</label>
                <Dropdown options={instrumentOptions.map((i: Instrument) => i.name.charAt(0).toUpperCase() + i.name.slice(1))} placeholder={profile?.instruments[0].instrument.name.charAt(0).toUpperCase() + profile?.instruments[0].instrument.name.slice(1)} onChange={changeInstrument1}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience_level">Experience Level</label>
                <Dropdown  options={experienceLevelOptions.map((e: ExperienceLevel) => e.level)} placeholder={profile?.instruments[0].experience_level.level} onChange={changeExperience1} />
            </div>
            {/* <div className="form-group">
                <label htmlFor="instruments">Instruments</label>
                <Dropdown options={instrumentOptions.map((i: Instrument) => i.name.charAt(0).toUpperCase() + i.name.slice(1))} placeholder={profile?.instruments[0].instrument.name.charAt(0).toUpperCase() + profile?.instruments[0].instrument.name.slice(1)}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience_level">Experience Level</label>
                <Dropdown options={experienceLevelOptions.map((e: ExperienceLevel) => e.level)} placeholder={profile?.instruments[0].experience_level.level} />
            </div> */}
            <button id='save-changes-button'>Save Changes</button>
       
            {/* <button type="submit" className="btn btn-primary btn-block">Sign Up</button> */}
            </form>
        </div>
    </div>
    //     <div className='wrapper'>
    //     <div className='edit-form-wrapper'>
    //         <h2>Edit Profile</h2>
    //         <form onSubmit={handleSubmit} noValidate >
    //             <div className='first_name'>
    //                 <label htmlFor="first_name">First Name</label>
    //                 <input type='first_name' name='first_name' id='edit-profile-first' onChange={handleChange}/>
    //             </div>
    //             <div className='last_name'>
    //                 <label htmlFor="last_name">Last Name</label>
    //                 <input type='last_name' name='last_name' id='edit-profile-last' onChange={handleChange}/>
    //             </div>
    //             <div className='gender'>
    //                 <label htmlFor="gender">Gender</label>
    //                 <input type='gender' name='gender' id='edit-profile-gender' onChange={handleChange}/>
    //             </div>      
    //             <div className='birth_date'>
    //                 <label htmlFor="birth_date">Birth Date</label>
    //                 <input type='date' name='birth_date' id='edit-profile-birth-date' onChange={handleChange}/>
    //             </div>      
    //             <div className='zipcode'>
    //                 <label htmlFor="zipcode">Zipcode</label>
    //                 <input type='zipcode' name='zipcode' id='edit-profile-zipcode' onChange={handleChange}/>
    //             </div>      
    //             <div className='years_playing'>
    //                 <label htmlFor="years_playing">Years playing music</label>
    //                 <input type='number' name='years_playing' id='edit-profile-years-playing' onChange={handleChange}/>
    //             </div>      
    //             <div className='level_of_commitment'>
    //                 <label htmlFor="level_of_commitment">Level of commitment</label>
    //                 <input type='level_of_commitment' name='level_of_commitment' id='edit-profile-commitment' onChange={handleChange}/>
    //             </div>      
    //             <div className='seeking'>
    //                 <label htmlFor="seeking">Seeking</label>
    //                 <input type='seeking' name='seeking' id='edit-profile-seeking' onChange={handleChange}/>
    //             </div>      
    //             <div className='genres'>
    //                 <label htmlFor="genres">Genre</label>
    //                 <input type='genres' name='genres' id='edit-profile-genres' onChange={handleChange}/>
    //             </div>      

    //             <div className='submit'>
    //                 <button id='save-changes-button'>Save Changes</button>
    //                 {/* {error.length > 0 && <span style={{color: "red"}}>{error}</span>} */}
    //             </div>           
    //         </form>
    //     </div>
    // </div>
    );
};
export default EditProfile
