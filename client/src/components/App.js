import { useState } from 'react'
import '../styles/App.css'; // link to path
import { AuthProvider } from './Auth';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"; 

/** import components */
import Main from './Main'
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Profile from "./Profile";



function App() {
  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/contest' element={<Main></Main>}/>
          <Route path='/contest/quiz' element={<CheckUserExist><Quiz></Quiz></CheckUserExist>}/>
          <Route path='/contest/result' element={<CheckUserExist><Result></Result></CheckUserExist>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
