import React from 'react';
import './App.css';
import FixedContainer from './container';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'   element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/main_app' element={<FixedContainer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;