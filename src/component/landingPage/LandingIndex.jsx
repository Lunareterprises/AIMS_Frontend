import React from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import AccountingLandingPage from './AccountingLandingPage'
import AccountingDashboardAnnimation from './AccountingDashboardAnnimation'

function LandingIndex() {
  return (
    <div>
      <Header />
      <SubHeader />
      <hr className='text-gray-400'/>
      <AccountingLandingPage />
      <AccountingDashboardAnnimation />
    </div>
  )
}

export default LandingIndex