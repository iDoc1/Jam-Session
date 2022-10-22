import React from 'react';
import './App.css';
import SignUp from './components/SignUpForm/SignUpForm';
import SignIn from './components/SignInForm/SignInForm';
import Search from './components/SearchPage/Search';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Activate from './components/ActivatePage/ActivatePage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/activate/:uid/:token' element={<Activate />} />
        <Route path='/login' element={<SignIn />} />
      </Routes>
    </>
);
}

export default App;
