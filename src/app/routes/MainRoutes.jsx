import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../layouts/Header/Header'
import ChatBox from '../pages/ChatBox/ChatBox'
import Video from '../pages/Video/Video'
import Home from '../pages/Home/Home'
import Venue from '../pages/Venue/Venue'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chatbox' element={<ChatBox />} />
                <Route path='/venue' element={<Venue />} />
                <Route path='*' element={<></>} />
            </Routes>
            <></>
        </BrowserRouter>
    )
}
