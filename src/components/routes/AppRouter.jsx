import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MembersReg from '../pages/MembersReg'
import DonationReg from '../pages/DonationReg'
import TopBar from '../layout/TopBar'
import PaymentSuccess from '../pages/PaymentSuccess'

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path='/members-registration' element={<MembersReg/>}></Route>
        <Route path='/donation-registration' element={<DonationReg/>}></Route>
        <Route
          path="/payment-success/:applicationId"
          element={<PaymentSuccess />}
        />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
