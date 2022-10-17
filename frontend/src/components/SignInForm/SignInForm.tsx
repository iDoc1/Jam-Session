import React, { useState } from "react";
import "./style.css"
import axios from "axios";

const emailRegex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignInProps {
    name?: any;
    value?: any;
}

interface SignInState {
    email : string,
    password : string
    errors : string
}

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        switch( name ) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!email || !password) {           
            setError('Missing Username and/or Password')
            setTimeout(() =>{
                setError('');
            }, 3000)
            return
        }
        const response = await axios.post(
            'http://localhost:8000/auth/jwt/create/',
            {
                "email": email,
                "password": password
            }
        )
        window.localStorage.setItem('loggedJamSessionUser', JSON.stringify(response.data));
        
    }

    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} noValidate >
                <div className='email'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' onChange={handleChange}/>
                </div>
                <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' onChange={handleChange}/>
                </div>              
                <div className='submit'>
                    <button>Register Me</button>
                    {error.length > 0 && <span style={{color: "red"}}>{error}</span>}
                </div>
                <div className='needAccount'>
                <p>Need an account? <br/></p>
                <span>
                    <a href="#">Sign Up</a>
                </span>
                </div>              
            </form>
        </div>
    </div>
    );
};
export default SignIn
