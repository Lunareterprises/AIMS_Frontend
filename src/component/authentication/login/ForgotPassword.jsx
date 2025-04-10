import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:5016/crm/forgotpass/otp",
        { email: values.email }
      );

      if (response.data.status) {
        setEmail(values.email);
        setStep(2); // Move to OTP step
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lunarsenterprises.com:5016/crm/otp/verify",
        {
          email,
          otp: values.otp,
        }
      );

      if (response.data.status) {
        setStep(3); // Move to reset password step
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://lunarsenterprises.com:5016/crm/changepass", {
        email,
        password: values.password,
      });
      alert("Password changed successfully!");
      handleClose(); // Reset modal after success
    } catch (error) {
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Required"),
            })}
            onSubmit={sendOtp}
          >
            <Form>
              <Field
                name="email"
                placeholder="Enter your email"
                className="p-2 w-full border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </Form>
          </Formik>
        );

      case 2:
        return (
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={Yup.object({
              otp: Yup.string().required("OTP required"),
            })}
            onSubmit={verifyOtp}
          >
            <Form>
              <Field
                name="otp"
                placeholder="Enter OTP"
                className="p-2 w-full border rounded"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-green-500 text-white py-2 rounded"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </Form>
          </Formik>
        );

      case 3:
        return (
          <Formik
            initialValues={{ password: "" }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password required"),
            })}
            onSubmit={changePassword}
          >
            <Form>
              <Field
                name="password"
                type="password"
                placeholder="Enter new password"
                className="p-2 w-full border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-purple-500 text-white py-2 rounded"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </Form>
          </Formik>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {renderStep()}

        <button
          onClick={handleClose}
          className="mt-4 w-full text-gray-500 text-sm hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
