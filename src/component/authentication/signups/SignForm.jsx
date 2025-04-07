import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../../assets/google.svg";
import twitter from "../../../assets/twitter.svg";
import zxcvbn from "zxcvbn";
import OtpModal from "./OtpScreen";
import { register } from "../../../api/services/authService";

const SignForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [userLocation, setUserLocation] = useState({ country: "", state: "" });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Load country list
    setCountryOptions(countryList().getData());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setUserLocation({
              country: data.address.country || "",
              state: data.address.state || "",
            });
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    country: Yup.object().shape({
      label: Yup.string().required("Country is required"),
      value: Yup.string().required(),
    }),
    state: Yup.string().required("State is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include an uppercase letter")
      .matches(/\d/, "Must include a number")
      .matches(/[!@#$%^&*]/, "Must include a special character")
      .required("Password is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required(),
  });

 

  //------------------API-------Register----------//


  const onSubmitForm = async (values, { setSubmitting }) => {
    const payload = {
      company_name: values.companyName,
      company_mail: values.email,
      company_mobile: values.mobile,
      country: values.country?.value,
      state: values.state,
      password: values.password,
    };

    try {
      const response = await register(payload);
      
      alert(response.message);
      setModalOpen(true);
      setEmail(values.email);
    } catch (error) {
      // Already handled by interceptor, but can log or show more info here
      console.error("Registration failed", error);
    }
    
  };

  return (
    <div className="  flex w-full items-center justify-center h-screen mt-20 xl:mb-10  p-5 xl:p-40">
      <div className="w-full  flex items-center justify-center">
        <div className="w-full ">
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
              </div>
              <span className="font-bold text-xl">BizFlow Books</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6">Let's get started.</h2>

          <Formik
            initialValues={{
              companyName: "",
              email: "",
              mobile: "",
              country: userLocation.country
                ? { label: userLocation.country, value: userLocation.country }
                : null,
              state: userLocation.state || "",
              password: "",
              agreeToTerms: false,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300">
                    <span className="text-gray-500 mr-2">⚙</span>

                    <Field
                      type="text"
                      name="companyName"
                      className="w-full focus:outline-none"
                      placeholder="Company Name"
                    />
                  </div>
                  <ErrorMessage
                    name="companyName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300">
                    <span className="text-gray-500 mr-2">✉</span>

                    <Field
                      type="email"
                      name="email"
                      className="w-full focus:outline-none"
                      placeholder="Email address"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-2 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300 rounded">
                  <PhoneInput
                    country={"in"}
                    placeholder=" Mobile Number"
                    value={values.mobile}
                    onChange={(phone) => setFieldValue("mobile", phone)}
                    inputProps={{ name: "mobile", required: true }}
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ width: "100%", height: "40px" }}
                  />
                </div>
                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-500 text-sm "
                />

                {/* Password Field */}
                <div className="mb-4 mt-2 relative ">
                  <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300">
                    <span className="text-gray-500 mr-2">🔑</span>

                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full focus:outline-none"
                      placeholder="Password"
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                        setPasswordStrength(zxcvbn(e.target.value).score);
                      }}
                    />
                    <span
                      className="absolute right-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />

                  {/* Password Strength Meter */}
                  <div className="w-full h-2 mt-2 rounded bg-gray-200 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300">
                    <div
                      className={`h-2 ${
                        [
                          "bg-red-500",
                          "bg-orange-400",
                          "bg-yellow-500",
                          "bg-green-500",
                          "bg-blue-500",
                        ][passwordStrength]
                      }`}
                      style={{ width: `${(passwordStrength + 1) * 20}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Strength:{" "}
                    {
                      ["Weak", "Fair", "Good", "Strong", "Very Strong"][
                        passwordStrength
                      ]
                    }
                  </p>
                </div>
                {/* Country & State Selection */}
                <div className="gap-2 flex w-full mb-4">
                  {/* Country Selection */}
                  <div className="flex-1 focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300 ">
                    <Select
                      options={countryOptions}
                      value={values.country}
                      onChange={(selected) =>
                        setFieldValue("country", selected)
                      }
                      className=" border-gray-300 rounded   w-full"
                      placeholder="Select Country"
                    />
                    <ErrorMessage
                      name="country.label"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* State Selection */}
                  <div className="flex-1  ">
                    <Field
                      type="text"
                      name="state"
                      className=" focus:outline-none border border-gray-300 rounded py-1.5  px-2 w-full focus-within:border-sky-100 focus-within:ring-2 focus-within:ring-sky-300"
                      placeholder="Enter State"
                    />
                    <ErrorMessage
                      name="state"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="mb-2 flex items-center">
                  <label className="flex items-center">
                    <Field
                      type="checkbox"
                      name="agreeToTerms"
                      className="mr-2"
                    />
                    <span className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <ErrorMessage
                  name="agreeToTerms"
                  component="div"
                  className="text-red-500 text-sm ml-2"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-3 bg-yellow-500 text-black font-bold py-3 rounded mb-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Creating account..." : "Create my account"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-xs text-center mb-6">*No credit card required</p>

          <div className="mb-4">
            <p className="text-center text-sm mb-4">Sign up using</p>
            <div className="flex justify-center space-x-4">
              <button className="border border-gray-300   bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center">
                <img src={google} alt="Google" className="w-6 h-6" />
              </button>
              <button className="border border-gray-300 bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png"
                  alt="Microsoft"
                  className="w-6 h-6"
                />
              </button>
              <button className="border border-gray-300 bg-gray-100 rounded-md w-12 h-12 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/512px-LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </button>
              <button className="border  border-gray-300 rounded-md bg-gray-100 w-12 h-12 flex items-center justify-center">
                <img src={twitter} alt="Twitter X" className="w-6 h-6" />
              </button>
              <button className="border border-gray-300 rounded-md bg-gray-100 w-12 h-12 flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/" className="text-blue-600">
              Log in
            </a>
          </div>
        </div>
      </div>

      <OtpModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
      />
    </div>
  );
};

export default SignForm;
