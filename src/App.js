import React from 'react';
import './App.css';
import FixedContainer from './container';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login';
import Registration from './register';
import MainMenu from './MainMenu';
import Leaderboard from './components/Leaderboard';
import UserScores from './components/User_scores';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'   element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<Login />}/> 
          <Route path='/'   element={<Navigate to='/main_app'/>}/>
          <Route path='/main_menu' element={<MainMenu />}/>
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/main_app' element={<FixedContainer/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/user/scores/:userId' element={<UserScores/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;