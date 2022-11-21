import React from 'react';
import './NavBarStyle.css'
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {
    isAuthenticated: null | boolean,
    setIsAuthenticated: Function
}

export default function NavBar({isAuthenticated, setIsAuthenticated}: NavBarProps) {
    const navigate = useNavigate();

    const logout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('loggedJamSessionUser');
      localStorage.removeItem('loggedJamSessionEmail');
      localStorage.removeItem('loggedJamSessionProfile');
      localStorage.removeItem('loggedJamSessionSocials');
      navigate('/');
  }

    return (
        <nav className="nav">
            <div className='nav-container'>
                <ul>
                    <li><Link to="/" className="site-title" id='site-title'>Jam Session</Link></li>
                    <Link to="/search">Search</Link>
                    {isAuthenticated
                      ? <>
                            <Link id='profile-link' to="/profile">Profile</Link>
                            <Link id='new-post-link' to="/new-post">New Post</Link>
                        </>
                      : null
                    }
                </ul>
                <ul>
                    {isAuthenticated
                      ? <Link to='' onClick={logout}>Logout</Link>
                      : <>
                            <Link id='signup-link' to="/signup">Join Now</Link>
                            <Link id='login-link' to="login">Login</Link>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}