import React, { useState } from "react";
import "../globalStyle.css"

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
        // const response = await axios.post(
        //     'http://localhost:8000/auth/jwt/create/',
        // )
        const body = {
                "email": email,
                "password": password
            }
        const res = await fetch('http://localhost:8000/auth/jwt/create/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        
        const jsonRes = await res.json()
        console.log(jsonRes);
        
        if (res.status >= 200 && res.status <= 299){
            window.localStorage.setItem('loggedJamSessionUser', JSON.stringify(jsonRes));
        }
        
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
