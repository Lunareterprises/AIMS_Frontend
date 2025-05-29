import React from 'react'
import HomeHeader from './HomeHeader'
import AccountingDashboard from './AccountingDashboard'
import CashFlowDashboard from './CashFlowDashboard'
import FinancialDashboard from './FinancialDashboard'
import Projects from './Projects'
import Footer from './Footer'

function HomeIndex() {
  return (
    <div>
      <HomeHeader />
      <AccountingDashboard />
      <CashFlowDashboard />
      <FinancialDashboard />
      <Projects />
      <Footer />
    </div>
  )
}

export default HomeIndex
