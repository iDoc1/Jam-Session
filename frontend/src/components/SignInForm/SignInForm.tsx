import React, { useState } from "react";
import "../globalStyle.css"
import { useNavigate } from 'react-router-dom';

interface SignInProps {
    isAuthenticated: null | boolean,
    setIsAuthenticated: Function,
}

function SignIn({isAuthenticated, setIsAuthenticated}: SignInProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

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

    const getUserProfile = async () => {
        const res = await fetch('/auth/users/me/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }
        });
        const jsonMe = await res.json();
        
        // Save user if and email to local storage
        if (res.status === 200) {
          localStorage.setItem('loggedJamSessionUser', jsonMe.id);
          localStorage.setItem('loggedJamSessionEmail', jsonMe.email);
        }
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
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!email || !password) {           
            setError('Missing Username and/or Password')
            setTimeout(() =>{
                setError('');
            }, 3000)
            return
        }

        const body = {
                "email": email,
                "password": password
        }

        // Log in user
        const res = await fetch('/auth/jwt/create/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        
        const jsonRes = await res.json()

        // Save tokens to local storage
        if (res.status === 200) {
            setIsAuthenticated(true);
            localStorage.setItem('access', jsonRes.access);
            localStorage.setItem('refresh', jsonRes.refresh);
            getUserProfile();
            getProfile();
            navigate('/');
        } else {
            setIsAuthenticated(false);
            setError('Username and/or password incorrect');
        }

    }

    // Redirect to homepage if user already authenticated
    if (isAuthenticated) {
        navigate('/');
    }

    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} noValidate >
                <div className='email'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' id='sign-in-email' onChange={handleChange}/>
                </div>
                <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' id='sign-in-password' onChange={handleChange}/>
                </div>              
                <div className='submit'>
                    <button id='sign-in-button'>Sign In</button>
                    {error.length > 0 && <span style={{color: "red"}}>{error}</span>}
                </div>
                <div className='needAccount'>
                <p>Need an account? <br/></p>
                <span>
                    <a href="/signup" id="sign-in-registration-redirect">Sign Up</a>
                </span>
                </div>              
            </form>
        </div>
    </div>
    );
};
export default SignIn
