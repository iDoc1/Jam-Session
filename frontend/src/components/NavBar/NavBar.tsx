import React from 'react';
import './NavBarStyle.css'
import { Link, useMatch, useResolvedPath } from "react-router-dom";

// interface props {
//     href?: React.ReactNode
//     children?: React.ReactNode
// }

function CustomLink({ to, children, ...props}:any) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname, end:true})
    return (
        <li className={isActive? "active": ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default function NavBar() {
    return (
        <nav className="nav">
            <div className='nav-container'>
                <ul>
                    <li><Link to="/" className="site-title" id='site-title'>Jam Session</Link></li>
                    <CustomLink to="/search">Search</CustomLink>

                </ul>
                <ul>
                    <CustomLink to="/signup">Join Now</CustomLink>
                    <CustomLink to="login">Login</CustomLink>
                </ul>
            </div>
        </nav>
    )
}