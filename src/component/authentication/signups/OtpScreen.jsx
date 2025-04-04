import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import OtpInput from "react-otp-input";

const OtpModal = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setOtp("");
      setTimer(60);
      setResendDisabled(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setResendDisabled(true);
    console.log("OTP resent to:", email);
  };

  const handleVerify = () => {
    if (otp.length === 4) {
        onClose()
        setResendDisabled(false);
      console.log("Verifying OTP:", otp);
    } else {
      alert("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ overlay: { zIndex: 9999 } }}  // Higher z-index
      className="flex items-center justify-center min-h-screen z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center  bg-opacity-10"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-lg font-bold mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-4">OTP sent to {email}</p>

        <OtpInput
          value={otp}
        
      
          numInputs={4}
          onChange={(value) => {
            const numericOnly = value.replace(/\D/g, ""); // removes all non-digit characters
            setOtp(numericOnly);
          }}
          
          isInputNum={true} // ✅ Only allow numbers
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "50px",
            height: "50px",
            margin: "5px",
            fontSize: "22px",
            justifyContent:'center',
            flex:1,
            textAlign: "center",
            border: "2px solid #ddd",
            borderRadius: "8px",
          }}
        />

        <p className="text-sm mt-3">Resend in {timer}s</p>

        <button
          className={`mt-3 px-4 py-2 text-white rounded w-full ${
            resendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          onClick={handleResend}
          disabled={resendDisabled}
        >
          Resend OTP
        </button>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded w-1/2 mr-2"
            onClick={handleVerify}
          >
            Verify OTP
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded w-1/2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OtpModal;
