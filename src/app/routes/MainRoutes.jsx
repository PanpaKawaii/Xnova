import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '../layouts/Header/Header'
import ChatBox from '../components/ChatBox/ChatBox'
import LoginRegister from '../pages/LoginRegister/LoginRegister'
import Home from '../pages/Home/Home'
import Venue from '../pages/Venue/Venue'
import VenueDetail from '../pages/Venue/VenueDetail'
import { FindTeammatePage } from '../pages/Matching/FindTeammatePage'
import InvitationBox from '../pages/Invitation/Invitation'
import PaymentStatus from '../pages/Payment/PaymentStatus'
import TestPage from '../pages/TestPage'
import ScrollToTop from '../hooks/ScrollToTop/useScrollToTop'
import XnovaObject from '../components/XnovaObject/XnovaObject'
import SoccerBall from '../components/SoccerBall/SoccerBall'
import HomePageTest from '../pages/HomePageTest/HomePageTest'
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation'

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' element={<HomePageTest />} />
                <Route path='/test' element={<TestPage />} />
                <Route path='/invitation' element={<InvitationBox />} />
                <Route path='/venue' element={<Venue />} />
                <Route path='/venue/:id' element={<VenueDetail />} />
                <Route path='/player' element={<FindTeammatePage />} />
                <Route path='/paymentstatus' element={<PaymentStatus />} />
                <Route path='/login-register' element={<LoginRegister />} />
                <Route path='/soccerball' element={<SoccerBall />} />
                <Route path='/oldhomepage' element={<Home />} />
                <Route path='/loadinganimation' element={<LoadingAnimation />} />
                <Route path='*' element={<></>} />
            </Routes>
            <ChatBox />
            <></>
        </BrowserRouter>
    )
}
