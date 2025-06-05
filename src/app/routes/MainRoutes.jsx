import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../layouts/Header/Header'
import ChatBox from '../pages/ChatBox/ChatBox'
import Video from '../pages/Video/Video'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Video />} />
                <Route path='/chatbox' element={<ChatBox />} />
                <Route path='*' element={<></>} />
            </Routes>
            <></>
        </BrowserRouter>
    )
}
