import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../layouts/Header/Header'
import ChatBox from '../components/ChatBox/ChatBox'
import Home from '../pages/Home/Home'
import Venue from '../pages/Venue/Venue'
// import VenueDetail from '../pages/Venue/VenueDetail'
// import Invitation from '../pages/Invitation/Invitation'
import TestPage from '../pages/TestPage';       

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/test' element={<TestPage />} />
                <Route path='/' element={<Home />} />   
                <Route path='/venue' element={<Venue />} />
                {/* <Route path='/venue/:id' element={<VenueDetail />} /> */}
                {/* <Route path='/player' element={<Invitation />} /> */}
                <Route path='*' element={<></>} />
            </Routes>
            <ChatBox />
            <></>
        </BrowserRouter>
    )
}
