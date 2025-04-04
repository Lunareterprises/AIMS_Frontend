import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaApple,
  FaGoogle,
  FaYahoo,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaMicrosoft,
  FaQrcode,
} from "react-icons/fa";

import bgimage from "../../../../public/Images/AuthicationImage/BgImage_login.jpg";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  // Initial validation schema (email only)
  const initialValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email or mobile number is required"),
  });

  // Full validation schema (email and password)
  const fullValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email or mobile number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Handle next button click
  const handleNextClick = (values) => {
    setEmail(values.email);
    setShowPassword(true);
  };

  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Add your authentication logic here
  };

  // Social sign-in options

  const socialSignInOptions = [
    { id: "apple", icon: <FaApple />, bg: "bg-black", text: "text-white" },
    {
      id: "google",
      icon: <FaGoogle />,
      bg: "bg-white",
      text: "text-black border border-gray-300",
    },
    { id: "yahoo", icon: <FaYahoo />, bg: "bg-purple-600", text: "text-white" },
    {
      id: "facebook",
      icon: <FaFacebookF />,
      bg: "bg-blue-600",
      text: "text-white",
    },
    {
      id: "linkedin",
      icon: <FaLinkedinIn />,
      bg: "bg-blue-700",
      text: "text-white",
    },
    {
      id: "twitter",
      icon: <FaTwitter />,
      bg: "bg-blue-400",
      text: "text-white",
    },
    {
      id: "microsoft",
      icon: <FaMicrosoft />,
      bg: "bg-blue-500",
      text: "text-white",
    },
    // { id: "more", icon: <BsThreeDots />, bg: "bg-gray-200", text: "text-gray-600" },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" bg-gray-100 min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left section */}
        <div className="w-full lg:w-1/2 p-8">
          {/* BizFlow logo */}
          <div className="mb-6 flex justify-between items-center">
            <img
              src="/AuthicationImage/avatar.jpg"
              alt="BizFlow"
              className="h-8"
            />

            {/* Smart sign-in button */}
            <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full">
              <span className="text-lg">
                {" "}
                <FaQrcode />
              </span>
              <span>Try smart sign-in</span>
            </button>
          </div>

          {/* Sign in heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-gray-600">to access Books</p>
          </div>

          {/* Sign in form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={
              showPassword ? fullValidationSchema : initialValidationSchema
            }
            onSubmit={handleSubmit}
          >
            {({ values, isValid, dirty, handleSubmit }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email address or mobile number"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={showPassword}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {showPassword && (
                  <div className="mb-4">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                    <div className="flex justify-end mt-2">
                      <a href="#" className="text-blue-500 text-sm">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                )}

                {!showPassword ? (
                  <button
                    type="button"
                    onClick={() => handleNextClick(values)}
                    disabled={!isValid || !dirty}
                    className="w-full bg-blue-500 text-white py-3 rounded font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded font-medium hover:bg-blue-600 transition duration-200"
                  >
                    Sign In
                  </button>
                )}
              </Form>
            )}
          </Formik>

          {/* Sign in using */}
          <div className="mt-6">
            <p className="text-gray-500 mb-4">Sign in using</p>
            <div className="flex flex-wrap gap-2">
              {socialSignInOptions.map((option) => (
                <button
                  key={option.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${option.bg} ${option.text}`}
                >
                  {option.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have a BizFlow account?
              <a href="/Signup" className="text-blue-500 ml-1">
                Sign up now
              </a>
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="hidden lg:block w-1/2 p-8 bg-gray-50">
          <div className="flex flex-col items-center h-full justify-center">
            <div className="mb-6">
              <img
                src="https://accounts.Zoho.com/v2/components/images/passwordless_illustration2x.png"
                alt="MFA"
                className="w-64"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">MFA for all accounts</h2>
            <p className="text-center text-gray-600 mb-4">
              Secure online accounts with OneAuth 2FA. Back up OTP secrets and
              never lose access to your accounts.
            </p>
            <a href="#" className="text-blue-500">
              Learn more
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-gray-500 text-sm">
        © 2025, BizFlow Corporation Pvt. Ltd. All Rights Reserved.
      </div>
    </div>
  );
};

export default LoginForm;
