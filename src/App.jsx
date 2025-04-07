
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage/LandingPage'
import Signup from './pages/authentication/Signup'
import Login from './pages/authentication/Login'
import OrganizationProfile from './pages/organizationProfile/OrganizationProfile'
import AddItems from './pages/Items/AddItems'


function App() {
  return (
  <Routes>
      <Route path="LandingPage" element={<LandingPage />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/OrganizationProfile" element={<OrganizationProfile />} />
      <Route path="/" element={<AddItems />} />

      


  </Routes>
  )
}

export default App