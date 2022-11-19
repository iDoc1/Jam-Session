import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SignUp from './components/SignUpForm/SignUpForm';
import SignIn from './components/SignInForm/SignInForm';
import Search from './components/SearchPage/Search';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Activate from './components/ActivatePage/ActivatePage';
import EditProfile from './components/EditProfile/EditProfileForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import PrivateWrapper from './components/PrivateWrapper/PrivateWrapper';
import NewPostPage from './components/NewPostPage/NewPostPage';
import IndividualPostPage from './components/IndividualPostPage/IndividualPostPage';
import { Route, Routes } from 'react-router-dom';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Checks if access token for current user is valid
  const checkUserAuthenticated = useCallback( async () => {
    // Check if access token exists, then verify that it is still valid
    if (localStorage.getItem('access')) {
      const res = await fetch('/auth/jwt/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: localStorage.getItem('access')
        })
      });
      
      if (res.status === 200) {
        setIsAuthenticated(true);
      } else if (res.status === 401) {  // Access token expired, so must refresh it
        await refreshAccessToken();
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false); // Done loading authentication check
  }, [])

  // Attempts to get a new access token using the refresh token
  const refreshAccessToken = async () => {
    let refresh = { 'refresh': localStorage.getItem('refresh')}
    console.log('refresh:' , refresh);
    
    const res = await fetch('/auth/jwt/refresh/', {
      method: 'POST',
      body: JSON.stringify(refresh),
      headers: {
          'Content-type': 'application/json',
      }
    });
    const data = await res.json();
    console.log('test:', data);
    
    if (res.status === 200) {  // Refresh token still valid
      setIsAuthenticated(true);
      localStorage.setItem('access', data.access);
    } else {  // Refresh token expired
      setIsAuthenticated(false);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('loggedJamSessionUser');
      localStorage.removeItem('loggedJamSessionEmail');
    }
  }

  useEffect(() => {
    checkUserAuthenticated();
  }, [checkUserAuthenticated]);

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/activate/:uid/:token' element={<Activate />} />
        <Route path='/login' element={
          <SignIn isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route path='post/:id' element={<IndividualPostPage />}/>
        <Route element={<PrivateWrapper isAuthenticated={isAuthenticated} loading={loading} />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/new-post' element={<NewPostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
