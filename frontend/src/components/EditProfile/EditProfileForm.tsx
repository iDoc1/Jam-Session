import React, { useEffect, useState } from "react";
import "../globalStyle.css"
import "./EditProfileForm.css"
import { Profile, Gender, CommitmentLevel } from '../../types'
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
    const [genreOptions, setGenreOptions] = useState(null);
    const [genreSelection, setGenreSelection] = useState([]);

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

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(profile);
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
    //     console.log(jsonRes);
        
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

    useEffect(() => {
        getGenderOptions();
        getCommitmentOptions();

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
                {/* <input type='gender' name='gender' id='edit-profile-gender' onChange={handleChange}/> */}
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
                <label htmlFor="years_playing">Years playing music</label>
                <input type='string' name='years_playing' id='edit-profile-years-playing' onChange={handleChange} value={profile.years_playing}/>
            </div>
            <div className="form-group">
                <label htmlFor="level_of_commitment">Level of commitment</label>
                <Dropdown options={commitmentOptions.map((c : CommitmentLevel) => c.level)} placeholder={profile?.level_of_commitment.level} onChange={changeCommitment}/>
                {/* <input type='level_of_commitment' name='level_of_commitment' id='edit-profile-commitment' onChange={handleChange} value={profile.level_of_commitment.level}/> */}
            </div>
            {/* <div className="form-group">
                <label htmlFor="birth_date">Birth Date</label>
                <input type='date' name='birth_date' id='edit-profile-birth-date' onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="birth_date">Birth Date</label>
                <input type='date' name='birth_date' id='edit-profile-birth-date' onChange={handleChange}/>
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
