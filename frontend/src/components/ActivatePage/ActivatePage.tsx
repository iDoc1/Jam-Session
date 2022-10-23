import { useState, useEffect } from 'react';
import './ActivatePage.css'

export default function Activate() {
    const [validated, setValidated] = useState(false)
    const validateUser = async () => {
        let url = new URL(window.location.href)
        let params = url.pathname.split('/')
        params = params.filter(e => e !== '' && e !== 'activate')
        
        if (params.length === 0) {return}
        
        if (!validated) {
            const body = {
                "uid": params[0],
                "token": params[1]
            }
            const res = await fetch('http://localhost:8000/auth/users/activation/', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            console.log(res);
            
            setValidated(true)
        }
        
    }
    useEffect(()=>{
        validateUser()
    })
    return (
        <div className="success-card-holder">
            <div className='success-card'>
                <h1>Success!</h1> 
                <p>Your account has been activated;<br/> You can now <a href="/login">Sign in</a> with your credentials</p>
            </div>
        </div>
    )
}