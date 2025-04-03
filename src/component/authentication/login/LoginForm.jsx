

import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles

const LoginForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    mobile: '',
    password: '',
    country: 'India',
    state: 'Kerala',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Blue Panel */}
     
      
      {/* Right Signup Form */}
      <div className="w-full md:w-3/5 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
              </div>
              <span className="font-bold text-xl">BizFlow Books</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Let's get started.</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border rounded p-2">
                <span className="text-gray-500 mr-2">⚙</span>
                <input
                  type="text"
                  name="companyName"
                  className="w-full focus:outline-none"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center border rounded p-2">
                <span className="text-gray-500 mr-2">✉</span>
                <input
                  type="email"
                  name="email"
                  className="w-full focus:outline-none"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              {/* <div className="flex items-center border rounded p-2">
                <span className="text-gray-500 mr-2">📞</span>
                <select className="bg-transparent border-r pr-2 text-gray-500">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  className="w-full focus:outline-none ml-2"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div> */}

<div className="mb-4">
              <PhoneInput
                country={"in"} // Default country (India)
                value={formData.mobile}
                onChange={(phone) => setFormData({ ...formData, mobile: phone })}
                inputProps={{
                  name: "mobile",
                  required: true,
                  autoFocus: false,
                }}
                containerStyle={{ width: "100%" }}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "50px", // Space for flag
                }}
              />
            </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center border rounded p-2">
                <span className="text-gray-500 mr-2">🔑</span>
                <input
                  type="password"
                  name="password"
                  className="w-full focus:outline-none"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4 flex space-x-4">
              <div className="flex-1 border rounded p-2 flex items-center">
                <span className="text-gray-500 mr-2">🌎</span>
                <span>India</span>
              </div>
              <div className="flex-1 border rounded p-2 flex items-center">
                <span className="text-gray-500 mr-2">📍</span>
                <span>Kerala</span>
              </div>
            </div>
            
            <div className="mb-4 text-sm">
              <p>Your data will be in INDIA data center.</p>
            </div>
            
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mr-2"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600">Privacy Policy</a>.
              </span>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded mb-2"
            >
              Create my account
            </button>
            
            <p className="text-xs text-center mb-6">*No credit card required</p>
            
            <div className="mb-4">
              <p className="text-center text-sm mb-4">Sign up using</p>
              <div className="flex justify-center space-x-4">
                <button className="border rounded-md w-10 h-10 flex items-center justify-center">
                  G
                </button>
                <button className="border rounded-md w-10 h-10 flex items-center justify-center">
                  M
                </button>
                <button className="border rounded-md w-10 h-10 flex items-center justify-center">
                  in
                </button>
                <button className="border rounded-md w-10 h-10 flex items-center justify-center">
                  X
                </button>
                <button className="border rounded-md w-10 h-10 flex items-center justify-center">
                  f
                </button>
              </div>
            </div>
            
            <div className="text-center text-sm">
              Already have an account? <a href="#" className="text-blue-600">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;