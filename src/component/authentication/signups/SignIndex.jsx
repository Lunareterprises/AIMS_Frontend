import React from "react";
import SignLeftSide from "./SignLeftSide";
import SignForm from "./SignForm";


function SignIndex() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Side: Visible on Medium (md) screens and larger, Hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 p-10">
        <SignLeftSide />
      </div>

      {/* Right Side (Login Form): Always visible */}
      <div className="w-full md:w-3/5 flex items-center justify-center">
        <SignForm/>
      </div>
    </div>
  );
}

export default SignIndex;
