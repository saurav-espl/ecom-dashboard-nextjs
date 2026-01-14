import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const Forgot = () => {
  const [showInputOtpForm, setShowInputOtpForm] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // FIX: Using a single ref object for an array of inputs is cleaner in React
  const inputRefs = useRef([]);

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowInputOtpForm(true);
    setButtonText("Verify OTP");
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <main className="form_container">
      <div className="formDiv">
        <form className="form">
          <h2 className="page-title">Forgot Password</h2>
          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            {/* FIX: Safety check for FontAwesomeIcon */}
            {faAt && <FontAwesomeIcon width={15} icon={faAt} />}
            <input
              type="email"
              className="input"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div
            className={
              showInputOtpForm ? "inputOtpForm" : "inputOtpForm hidden"
            }
          >
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                className="otp"
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength={1}
                // FIX: Proper way to assign refs in a loop
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <button
            type="submit" // Corrected from button="submit"
            className="button-submit"
            onClick={handleForgotPasswordClick}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Forgot;