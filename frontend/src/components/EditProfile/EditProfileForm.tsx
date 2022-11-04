import React, { useState } from "react";
import "../globalStyle.css"

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
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [gender, setGender] = useState({});
    // const [birthdate, setBirthdate] = useState('');
    // const [zipcode, setZipcode] = useState('');
    // const [yearsPlaying, setYearsPlaying] = useState('');
    // const [commitment, setCommitment] = useState({});
    // const [seeking, setSeeking] = useState('');
    // const [instruments, setInstruments] = useState([]);
    // const [genres, setGenres] = useState([]);
    const [profile, setProfile] = useState<any>(
        {
            "first_name": "",
            "last_name": "",
            "gender": {
                "id": 2,
                "gender": "Man"
            },
            "birth_date": "",
            "zipcode": "",
            "years_playing": 0,
            "level_of_commitment": {
                "id": 2,
                "level": "Moderately serious",
                "rank": 2
            },
            "seeking": "",
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
    )

    const handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        switch( name ) {
            case 'first_name':
                setProfile({...profile, "first_name":value})
                break
            case 'last_name':
                setProfile({...profile, "last_name":value})
                break
            case 'gender':
                setProfile({...profile, "gender":value})
                break
            case 'birth_date':
                setProfile({...profile, "birth_date":value})
                break
            case 'zipcode':
                setProfile({...profile, "zipcode":value})
                break
            case 'years_playing':
                setProfile({...profile, "years_playing":parseInt(value)})
                break
            case 'level_of_commitment':
                setProfile({...profile, "level_of_commitment":value})
                break
            case 'seeking':
                setProfile({...profile, "seeking":value})
                break
            case 'instruments':
                setProfile({...profile, "instruments":value})
                break
            case 'genres':
                setProfile({...profile, "genres":[...profile.genres, value]})
                break
            default:
                break
        }
        console.log(profile);
        
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

    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} noValidate >
                <div className='first_name'>
                    <label htmlFor="first_name">First Name</label>
                    <input type='first_name' name='first_name' id='edit-profile-first' onChange={handleChange}/>
                </div>
                <div className='last_name'>
                    <label htmlFor="last_name">Last Name</label>
                    <input type='last_name' name='last_name' id='edit-profile-last' onChange={handleChange}/>
                </div>
                <div className='gender'>
                    <label htmlFor="gender">Gender</label>
                    <input type='gender' name='gender' id='edit-profile-gender' onChange={handleChange}/>
                </div>      
                <div className='birth_date'>
                    <label htmlFor="birth_date">Birth Date</label>
                    <input type='date' name='birth_date' id='edit-profile-birth-date' onChange={handleChange}/>
                </div>      
                <div className='zipcode'>
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type='zipcode' name='zipcode' id='edit-profile-zipcode' onChange={handleChange}/>
                </div>      
                <div className='years_playing'>
                    <label htmlFor="years_playing">Years playing music</label>
                    <input type='number' name='years_playing' id='edit-profile-years-playing' onChange={handleChange}/>
                </div>      
                <div className='level_of_commitment'>
                    <label htmlFor="level_of_commitment">Level of commitment</label>
                    <input type='level_of_commitment' name='level_of_commitment' id='edit-profile-commitment' onChange={handleChange}/>
                </div>      
                <div className='seeking'>
                    <label htmlFor="seeking">Seeking</label>
                    <input type='seeking' name='seeking' id='edit-profile-seeking' onChange={handleChange}/>
                </div>      
                <div className='genres'>
                    <label htmlFor="genres">Genre</label>
                    <input type='genres' name='genres' id='edit-profile-genres' onChange={handleChange}/>
                </div>      

                <div className='submit'>
                    <button id='save-changes-button'>Save Changes</button>
                    {/* {error.length > 0 && <span style={{color: "red"}}>{error}</span>} */}
                </div>           
            </form>
        </div>
    </div>
    );
};
export default EditProfile
