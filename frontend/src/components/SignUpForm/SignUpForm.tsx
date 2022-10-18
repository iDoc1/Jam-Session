import React, { useState } from "react";
import "../globalStyle.css"
import "./SignUpForm.css"
// import axios from "axios";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

interface SignUpProps {
    name?: any;
    value?: any;
}

interface SignUpState {
    email : string,
    password : string,
    repeatPassword : string,
    errors : {
        email : string,
        password : string,
        repeatPassword : string
    },
    success: boolean
}
// <SignUpProps, SignUpState>

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({
        email : '',
        password : '',
        repeatPassword : ''
    })
    const [success, setSuccess] = useState(false)
    
    const handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        switch( name ) {
            case 'email':
                errors.email = emailRegex.test(value)? '': 'Email is not valid!';
                setEmail(value)
                break
            case 'password':
                errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
                setPassword(value)
                break
            case 'repeatPassword':
                errors.repeatPassword = password === event.target.value? '': 'Password do not match!';
                setRepeatPassword(value)
                break
            default:
                break
        }
        
    }
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const body = {
                "email": email,
                "password": password,
                "re_password": repeatPassword
            }

        const res = await fetch('http://localhost:8000/auth/users/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const jsonRes = await res.json()
        if (res.status >= 200 && res.status <= 299){
            setSuccess(true)
            
            setTimeout(() => {
                setSuccess(false)
            }, 5000)

        } else {
            if (jsonRes.email) {
                let string = jsonRes.email[0]
                const new_errors = {...errors, 'email': string[0].toUpperCase() + string.slice(1)};
            
                setErrors(new_errors)                
            }
            if (jsonRes.password) {
                const new_errors = {...errors, 'password': jsonRes.password[0]};
                
                setErrors(new_errors)
            }            
        }
    }
    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} noValidate >
                <div className='email' data-jest="sign-up-email">
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' id='sign-up-email' onChange={handleChange}/>
                    {email.length > 0 && <span style={{color: 'red'}}>{errors.email}</span>}
                </div>
                <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' id='sign-up-password' onChange={handleChange}/>
                    {password.length > 0 && <span style={{color: 'red'}}>{errors.password}</span>}
                </div>              
                <div className='repeatPassword'>
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input type='password' name='repeatPassword' id='sign-up-repeat-password' onChange={handleChange}/>
                    {repeatPassword.length > 0 && errors.password !== errors.repeatPassword && <span style={{color: 'red'}}>{errors.repeatPassword}</span>}
                </div>              
                <div className='submit'>
                    <button id='sign-up-button'>Register Me</button>
                </div>
            {success? <span className='success-message'>Account created! Check email to complete sign up</span>:<></>}

            </form>
        </div>
    </div>
    );
};
export default SignUp