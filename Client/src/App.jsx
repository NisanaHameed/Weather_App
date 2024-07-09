import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LoginAuth from './Authentication/LoginAuth';
import LogoutAuth from './Authentication/LogoutAuth';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path='/' element={<LoginAuth><Home /></LoginAuth>} />
          <Route path='/login' element={<LogoutAuth><Login /></LogoutAuth>} />
          <Route path='/signup' element={<LogoutAuth><Signup /></LogoutAuth>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

