// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
// import React from 'react'
import Home from './pages/Home';
import Register from './pages/Register';
import ShowUser from './pages/ShowUser';
import DeleteUser from './pages/DeleteUser';
import ListUser from './pages/ListUser';
import Login from './pages/Login'
import EditProfilePage from './pages/customer/EditProfilePage';
import UserProfilePage from './pages/customer/UserProfilePage';

const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Login/>}/> */}
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/edit/:id' element={<EditProfilePage/>}/>
      <Route path='/users/list' element={<ListUser/>}/>
      <Route path='/users/details/:id' element={<ShowUser/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/users/:id' element={<UserProfilePage/>}/>
      {/* <Route path='/users/profile/:id' element={<UserProfilePage/>}/> */}
      <Route path='/users/delete/:id' element={<DeleteUser/>}/>
    </Routes>
  )
}

export default App
