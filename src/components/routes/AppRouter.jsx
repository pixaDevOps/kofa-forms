import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MembersReg from '../../components/pages/MembersReg'
import DonationReg from '../../components/pages/DonationReg'
import TopBar from '../layout/TopBar'
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path='/members-registration' element={<MembersReg/>}></Route>
        <Route path='/donation-registration' element={<DonationReg/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
