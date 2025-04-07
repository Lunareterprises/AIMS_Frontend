// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-full p-4">
    <h2 className="text-xl font-bold mb-4">MyApp</h2>
    <nav className="flex flex-col space-y-2">
      <Link to="/LandingPage">Home</Link>
      <Link to="/AddItems">Add Items</Link>
      <Link to="/ViewItems">Items Overview</Link>

    </nav>
  </div>
);

export default Sidebar;
