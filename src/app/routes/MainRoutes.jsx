import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../layouts/Header/Header'
import ChatBox from '../components/ChatBox/ChatBox'
import LoginRegister from '../pages/LoginRegister/LoginRegister'
import Home from '../pages/Home/Home'
import Venue from '../pages/Venue/Venue'
import VenueDetail from '../pages/Venue/VenueDetail'
import Invitation from '../pages/Invitation/Invitation'
import PaymentStatus from '../pages/Payment/PaymentStatus'
import TestPage from '../pages/TestPage';
import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/test' element={<TestPage />} />
                <Route path='/' element={<Home />} />
                <Route path='/venue' element={<Venue />} />
                <Route path='/venue/:id' element={<VenueDetail />} />
                <Route path='/player' element={<Invitation />} />
                <Route path='/paymentstatus' element={<PaymentStatus />} />
                <Route path='/login-register' element={<LoginRegister />} />
                <Route path='*' element={<></>} />
            </Routes>
            <ChatBox />
            <></>
        </BrowserRouter>
    )
}
