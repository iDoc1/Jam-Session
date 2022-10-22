import React from 'react';
import './App.css';
import SignUp from './components/SignUpForm/SignUpForm';
import SignIn from './components/SignInForm/SignInForm';
import Search from './components/SearchPage/Search';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
      </Routes>
    </>
);
}

export default App;
