
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import Signup from './pages/authentication/Signup'
import Login from './pages/authentication/Login'
import OrganizationProfile from './pages/organizationProfile/OrganizationProfile'


function App() {
  return (
  <Routes>
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/OrganizationProfile" element={<OrganizationProfile />} />
      


  </Routes>
  )
}

export default App