import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import PrivatePage from './pages/privatePage/PrivatePage'
import './App.css'


function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/" action element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/game' element={<PrivatePage/>}/>
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/> */}
     
      </Routes>
    </div>
  )
}

export default App;