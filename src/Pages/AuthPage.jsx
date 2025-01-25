import { useEffect, useState } from "react";
import apple from "../assets/Images/apple.png";
import Facebook from "../assets/Images/Facebook.png";
import google from "../assets/Images/google.png";
import invisible from "../assets/Images/invisible.png";
import Sally from "../assets/Images/Sally.png";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../Utility/Utility";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const clientId = "YOUR_GOOGLE_CLIENT_ID";
  const redirectUri = "YOUR_REDIRECT_URI";

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_CODE
  }&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URI
  }&response_type=code&scope=openid%20profile%20email`;
  console.log(googleAuthUrl);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const toast = useToast();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post(`${base_URL}/users/login`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const { token, status, msg } = response.data;
        if (status) {
          dispatch({
            type: "PROFILE",
            payload: { token, ...response.data?.userData, isLoggedIn: true }
          });
          localStorage.setItem("taskConnectToken", token);
          toast({
            description: msg || "Logged in.",
            status: "success",
            duration: 1000
          });
          navigate("/");
        } else {
          localStorage.setItem("taskConnectToken", "");
          toast({
            description: msg || "Something went wrong.",
            status: "error",
            duration: 1000
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `${base_URL}/users/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.status) setIsLogin(!isLogin);
        else {
          toast({
            description: response.data.msg || "Something went wrong.",
            status: "error",
            duration: 1000
          });
        }
      } catch (error) {
        if (error.response?.status === 409) {
          toast({
            description: "User already exists. Please use a different email.",
            status: "error",
            duration: 1000
          });
        } else {
          console.error("Error:", error);
          toast({
            description:
              error.response?.data?.msg ||
              "Server error. Please try again later.",
            status: "error",
            duration: 1000
          });
        }
      }
    }
  };
  // Handle Google OAuth callback
  const handleGoogleCallback = async (code) => {
    try {
      const response = await axios.post(`${base_URL}/users/google-login`, {
        code
      });
      const { token, status, msg, userData } = response.data;

      if (status) {
        dispatch({
          type: "PROFILE",
          payload: { token, ...userData, isLoggedIn: true }
        });
        localStorage.setItem("taskConnectToken", token);
        toast({
          description: msg || "Logged in.",
          status: "success",
          duration: 1000
        });
        navigate("/");
      } else {
        toast({
          description: msg || "Something went wrong.",
          status: "error",
          duration: 1000
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "Google login failed.",
        status: "error",
        duration: 1000
      });
    }
  };

  const getGoogleAuthCode = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      handleGoogleCallback(code);
    }
  };

  useEffect(() => {
    getGoogleAuthCode();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[90%] h-full my-[50px] mx-auto flex bg-white gap-[20px]">
        <div className=" flex flex-col justify-left w-1/2 h-full ">
          <div className="w-fit text-[#000] font-poppins text-[30px] font-medium">
            {isLogin ? "Log In" : "Sign In"}
          </div>
          <div className="text-[#000] font-poppins text-[16px] font-normal">
            {isLogin
              ? "If you don’t have an account register"
              : "Already have an account"}
          </div>
          <div className="text-[#000] font-poppins text-[16px] font-normal">
            You can
            <span
              onClick={() => {
                setIsLogin(!isLogin);
              }}
              className=" text-[#0c21c1] text-[16px] font-semibold leading-normal font-poppins hover:cursor-pointer "
            >
              {isLogin ? ` Register here !` : ` Login here !`}.
            </span>
          </div>
          {isLogin ? (
            <div className="flex flex-col my-[25px] gap-[30px]">
              <div className="border-b-2 border-black ">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  Email
                </p>
                <div className="flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins  placeholder:text-[12px]"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="border-b-2 border-black ">
                <p className="basis-full font-medium  text-[#000842] font-poppins text-[16px]  leading-normal">
                  Password
                </p>
                <div className="flex items-center">
                  <input
                    value={formData.password}
                    onChange={handleInputChange}
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter your Password"
                  />
                  <img
                    src={invisible}
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                    alt="invisible"
                    className="w-[14px] h-[14px]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col my-[25px] gap-[30px]">
              <div className="border-b-2 border-black ">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  Name
                </p>
                <div className="flex">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              <div className="border-b-2 border-black ">
                <p className="basis-full text-[#000842] font-poppins text-[16px] font-medium leading-normal">
                  Email
                </p>
                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="border-b-2 border-black ">
                <p className="basis-full font-medium  text-[#000842] font-poppins text-[16px]  leading-normal">
                  Password
                </p>
                <div className="flex items-center">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                    placeholder="Enter your Password"
                  />
                  <img
                    src={invisible}
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                    alt="invisible"
                    className="w-[14px] h-[14px]"
                  />
                </div>
              </div>
              <div className="border-b-2 border-black ">
                <p className="basis-full font-medium  text-[#000842] font-poppins text-[16px]  leading-normal">
                  Confirm Password
                </p>
                <div className="flex items-center">
                  <input
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={passwordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your Password"
                    className="w-full placeholder:text-[#999] placeholder:font-poppins placeholder:text-[12px]"
                  />
                  <img
                    src={invisible}
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                    alt="invisible"
                    className="w-[14px] h-[14px]"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mt-[17px] flex font-poppins  justify-between items-baseline ">
            <p className="text-[12px] flex items-center ">
              <input type="checkbox" name="checkbox" id="check" />
              <label htmlFor="checkbox">Rememeber me</label>
            </p>
            <span
              onClick={() => {
                navigate("/forgot");
              }}
              className="cursor-pointer text-[#4d4d4d] text-[12px] font-light"
            >
              Forgot Password ?
            </span>
          </div>
          <button className="w-4/5 bg-[#0c21c1] mt-[3rem] rounded-[32px] m-auto h-10 text-[#fff] font-poppins text-[17px] font-medium shadow-[0px_4px_26px_0px_rgba(0,0,0,0.25)]">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="my-[20px] m-auto text-[#b5b5b5] font-poppins">
            or continue with
          </div>
          <div className="flex justify-evenly">
            <img style={{ cursor: "pointer" }} src={Facebook} alt="Facebook" />
            <img style={{ cursor: "pointer" }} src={apple} alt="Apple" />
            <a href={googleAuthUrl} target="_self" rel="noopener noreferrer">
              <img style={{ cursor: "pointer" }} src={google} alt="Google" />
            </a>
          </div>
        </div>
        <div className="w-1/2  rounded-2xl bg-[#000842]  m-auto">
          <img src={Sally} alt="Saly-10" />
        </div>
      </div>
    </form>
  );
};

export default AuthPage;
