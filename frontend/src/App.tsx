import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUpForm/SignUpForm';
import SignIn from './components/SignInForm/SignInForm';
import Search from './components/SearchPage/Search';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Activate from './components/ActivatePage/ActivatePage';
import EditProfile from './components/EditProfile/EditProfileForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Player from './components/MusicPlayer/Player';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [userId, setUserId] = useState(0);
  const [tokens, setTokens] = useState({
    "refresh": '',
    "access": ''
  });
  const [userEmail, setUserEmail] = useState('');

  const refreshTokens = async (tokens:any) => {
    const refreshBody = {
      "refresh": tokens.refresh
    }

    const res = await fetch('http://localhost:8000/auth/jwt/refresh/',{
      method: 'POST',
      body: JSON.stringify(refreshBody),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      }
    }
    )
    if (res.status === 401) {
      window.localStorage.removeItem("loggedJamSessionUser");
      window.localStorage.removeItem("loggedJamSessionProfile");
      console.log('invalid or expired tokens');
      return
      
    }

    const resJSON = await res.json()
    
    setTokens({"refresh": tokens.refresh, "access": resJSON.access})
    const me = await fetch('http://localhost:8000/auth/users/me/', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Authorization': `JWT ${resJSON.access}`
      }
  })
    const jsonMe = await me.json()
    
    setUserId(jsonMe.id)
    setUserEmail(jsonMe.email)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedJamSessionUser');

    if (!loggedUserJSON) return;
    const tokens = JSON.parse(loggedUserJSON);
    refreshTokens(tokens);

  },[])
  return (
    <>
      <NavBar/>
      <Routes>
        {/* <Route path='/' element={<Player />} /> */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/activate/:uid/:token' element={<Activate />} />
        <Route path='/login' element={<SignIn setTokens={setTokens} setUserId={setUserId} setUserEmail={setUserEmail}/>} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/profile' element={<ProfilePage tokens={tokens} userId={userId} userEmail={userEmail}/>} />
      </Routes>
    </>
);
}

export default App;
