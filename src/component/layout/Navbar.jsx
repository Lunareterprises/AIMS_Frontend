// src/components/layout/Navbar.jsx
import React from 'react';
import {FiSettings} from 'react-icons/fi'
import CommonButton from '../CommonUI/buttons/CommonButton';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate  = useNavigate();
  const handleNavigate = ()=>{
    navigate("/settings")
  }
return(
  <div className="bg-white shadow px-4 py-3 flex justify-between items-center">
    <h1 className="text-lg font-semibold">Dashboard</h1>
    <div className='flex items-center gap-8'>
      <CommonButton label={<FiSettings />} onClick={handleNavigate}/>
      <div>User Avatar</div>
    </div>
  </div>
)
};

export default Navbar;
