import React from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import AccountingLandingPage from './AccountingLandingPage'
import AccountingDashboardAnnimation from './AccountingDashboardAnnimation'
import TestimonialCarousel from './TestimonialCarousel'

function LandingIndex() {
  return (
    <div>
      <Header />
      <SubHeader />
      <hr className='text-gray-400'/>
      <AccountingLandingPage />
      <AccountingDashboardAnnimation />
      <TestimonialCarousel />
    </div>
  )
}

export default LandingIndex