// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPage';
import Signup from '../pages/authentication/Signup';
import Login from '../pages/authentication/Login';
import OrganizationProfile from '../pages/organizationProfile/OrganizationProfile';
import MainLayout from '../component/layout/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages - No Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/LandingPage" element={ <LandingPage />}/>
      <Route
        path="/OrganizationProfile"
        element={
          <MainLayout>
            <OrganizationProfile />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
