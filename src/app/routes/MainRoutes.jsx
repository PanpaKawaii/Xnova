import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ChatBox from '../pages/ChatBox/ChatBox'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <></>
            <Routes>
                <Route path='/' element={<ChatBox />} />
                <Route path='*' element={<></>} />
            </Routes>
            <></>
        </BrowserRouter>
    )
}
