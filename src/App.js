import React from 'react';
import './App.css';
import FixedContainer from './container';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login';
import Registration from './register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/'   element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<Login/>}/> */}
          <Route path='/'   element={<Navigate to='/main_app'/>}/>
          <Route path='/main_app' element={<FixedContainer/>}/>
          <Route path='/register' element={<Registration/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;