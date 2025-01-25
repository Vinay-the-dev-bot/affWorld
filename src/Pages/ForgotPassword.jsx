import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sally from "../assets/Images/Sally.png";
import { base_URL } from "../Utility/Utility";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const toast = useToast();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, newPassword, confirmPassword, otp } = formData;
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        description: "Please enter same password",
        status: "error",
        duration: 1000
      });
      return;
    }

    try {
      const response = await axios.post(
        `${base_URL}/users/reset-password`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("resp.data", response.data);
      const { status } = response.data;
      if (status) {
        toast({
          description: "Password Reset successfully, Please Login.",
          status: "success",
          duration: 1000
        });
        navigate("/login");
      } else {
        toast({
          title: "Please try after some time",
          description: "There was some error while resetting password.",
          status: "error",
          duration: 1000
        });
      }
    } catch (error) {
      console.log("Error resetting password:", error);
      const { notFound } = error.response.data;
      if (notFound)
        toast({
          title: "user doesn't exist!",
          status: "error",
          duration: 1000
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[90%] h-full my-[50px] mx-auto flex bg-white gap-[20px]">
        <div className="flex flex-col justify-left w-1/2 h-full">
          <div className="w-fit text-[#000] font-poppins text-[30px] font-medium">
            Forgot Password
          </div>
          <div className="text-[#000] font-poppins text-[16px] font-normal mt-2">
            Enter your registered email address and new password
          </div>
          <div className="flex flex-col my-[25px] gap-[30px]">
            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                Email
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                New Password
              </p>
              <div className="flex items-center">
                <input
                  type="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                Confirm Password
              </p>
              <div className="flex items-center">
                <input
                  type="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
          </div>
          <button className="w-4/5 bg-[#0c21c1] mt-[3rem] rounded-[32px] m-auto h-10 text-[#fff] font-poppins text-[17px] font-medium shadow-[0px_4px_26px_0px_rgba(0,0,0,0.25)]">
            Reset Password
          </button>
          <div className="mt-[20px] flex justify-center font-poppins">
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-[#4d4d4d] text-[12px] font-light"
            >
              Back to Login
            </span>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-1/2 rounded-2xl bg-[#000842] m-auto">
          <img src={Sally} alt="Sally Illustration" />
        </div>
      </div>
    </form>
  );

  return (
    <form
      onSubmit={isOtpSent ? handleResetPassword : handleSendOtp}
      className="w-[90%] h-full my-[50px] mx-auto flex bg-white gap-[20px]"
    >
      {/* Left Section */}
      <div className="flex flex-col justify-left w-1/2 h-full">
        <div className="w-fit text-[#000] font-poppins text-[30px] font-medium">
          Forgot Password
        </div>
        <div className="text-[#000] font-poppins text-[16px] font-normal mt-2">
          {isOtpSent
            ? "Enter the OTP sent to your email, and set your new password."
            : "Enter your registered email address, and we’ll send you a reset link."}
        </div>
        <div className="flex flex-col my-[25px] gap-[30px]">
          {/* Email Field */}
          <div className="border-b-2 border-black">
            <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
              Email
            </p>
            <div className="flex items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                placeholder="Enter your email address"
                required
                disabled={isOtpSent}
              />
            </div>
          </div>

          {/* OTP Field */}
          {isOtpSent && (
            <>
              <div className="border-b-2 border-black">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  OTP
                </p>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter OTP sent to your email"
                    required
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="border-b-2 border-black">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  New Password
                </p>
                <div className="flex items-center">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter your new password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="border-b-2 border-black">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  Confirm Password
                </p>
                <div className="flex items-center">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Re-enter your new password"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <button
          className="w-4/5 bg-[#0c21c1] mt-[3rem] rounded-[32px] m-auto h-10 text-[#fff] font-poppins text-[17px] font-medium shadow-[0px_4px_26px_0px_rgba(0,0,0,0.25)]"
          type="submit"
        >
          {isOtpSent ? "Reset Password" : "Send OTP"}
        </button>

        <div className="mt-[20px] flex justify-center font-poppins">
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[#4d4d4d] text-[12px] font-light"
          >
            Back to Login
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 rounded-2xl bg-[#000842] m-auto">
        <img src={Sally} alt="Sally Illustration" />
      </div>
    </form>
  );
  return (
    <form
      onSubmit={isOtpSent ? handleResetPassword : handleSendOtp}
      className="w-[90%] max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6"
    >
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">
        Reset Password
      </h1>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your registered email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={isOtpSent} // Disable email field after OTP is sent
        />
      </div>

      {/* OTP, Password, Confirm Password - Show only after OTP is sent */}
      {isOtpSent && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              required
              placeholder="Enter OTP sent to your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              placeholder="Enter new password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm your new password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isOtpSent ? "Reset Password" : "Send OTP"}
      </button>
    </form>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[90%] h-full my-[50px] mx-auto flex bg-white gap-[20px]">
        {/* Left Section */}
        <div className="flex flex-col justify-left w-1/2 h-full">
          <div className="w-fit text-[#000] font-poppins text-[30px] font-medium">
            Forgot Password
          </div>
          <div className="text-[#000] font-poppins text-[16px] font-normal mt-2">
            Enter your registered email address, and we’ll send you a reset
            link.
          </div>
          <div className="flex flex-col my-[25px] gap-[30px]">
            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                Email
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                New Password
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="border-b-2 border-black">
              <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                Confirm Password
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
          </div>
          <button className="w-4/5 bg-[#0c21c1] mt-[3rem] rounded-[32px] m-auto h-10 text-[#fff] font-poppins text-[17px] font-medium shadow-[0px_4px_26px_0px_rgba(0,0,0,0.25)]">
            Send Reset Link
          </button>
          <div className="mt-[20px] flex justify-center font-poppins">
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-[#4d4d4d] text-[12px] font-light"
            >
              Back to Login
            </span>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-1/2 rounded-2xl bg-[#000842] m-auto">
          <img src={Sally} alt="Sally Illustration" />
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
