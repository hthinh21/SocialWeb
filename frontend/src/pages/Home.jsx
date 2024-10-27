import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from './customer/HomePage'
import SearchPage from './customer/SearchPage'
import MessagePage from './customer/MessagesPage'
import NotificationPage from './customer/NotificationsPage'
import ProfilePage from './customer/ProfilePage'
import SettingPage from './customer/SettingPage';
const Home = () => {
  const handleHome = () => {
    document.getElementById('home').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
  };
  const handleSearch = () => {
    document.getElementById('search').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
  };
  const handleMessage = () => {
    document.getElementById('message').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
  };
  const handleNotify = () => {
    document.getElementById('notification').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
  };
  const handleProfile = () => {
    document.getElementById('profile').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
  };
  const handleSetting = () => {
    document.getElementById('setting').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
  };
  return (
    <div className='flex'>
      <div className='w-1/5 h-screen text-white'>
      
        <ul>
        
          <li onClick={handleHome} className='text-xl p-4 font-bold rounded-tr-lg bg-red-200 hover:cursor-pointer'>
            Home
          </li>
          <li onClick={handleSearch} className='text-xl p-4 font-bold bg-red-200 hover:cursor-pointer'>
            Search
          </li>
          <li onClick={handleMessage} className='text-xl p-4 font-bold bg-red-200 hover:cursor-pointer'>
            Messages
          </li>
          <li onClick={handleNotify} className='text-xl p-4 font-bold bg-red-200 hover:cursor-pointer'>
            Notifications
          </li>
          <li onClick={handleProfile} className='text-xl p-4 font-bold bg-red-200 hover:cursor-pointer'>
            Profile
          </li>
          <li onClick={handleSetting} className='text-xl p-4 font-bold rounded-br-lg bg-red-200 hover:cursor-pointer'>
            Settings
          </li>
        </ul>
      </div>
      <div className='w-4/5 block' id='home' >
        <HomePage/>
      </div>
      <div className='w-4/5 hidden' id='search'>
        <SearchPage/>
      </div>
      <div className='w-4/5 hidden' id='message'>
        <MessagePage/>
      </div>
      <div className='w-4/5 hidden' id='notification'>
        <NotificationPage/>
      </div>
      <div className='w-4/5 hidden' id='profile'>
        <ProfilePage/>
      </div>
      <div className='w-4/5 hidden' id='setting'>
        <SettingPage/>
      </div>
    </div>
  )
}

export default Home