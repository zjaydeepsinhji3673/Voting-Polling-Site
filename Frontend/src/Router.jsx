import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Protected from './components/utils/Protected.config';
import Home from './components/user/Home';
import Header from './components/user/Header';
import Createpoll from './components/user/Createpoll';
import Vote from './components/user/Vote';
import Mypolls from './components/user/Mypolls';
import P404 from './components/user/P404';
import Index from './components/user/Index';
import Loginex from './components/user/Loginex';
export default function Router() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/loginex' element={<Loginex/>}></Route>
            <Route path='*' element={< P404 />}></Route>
            <Route path='/' element={<Index />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route element={<Protected />}>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/create_poll' element={< Createpoll />}></Route>
              <Route path='/view_polls' element={< Vote />}></Route>
              <Route path='/my_polls' element={< Mypolls />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
