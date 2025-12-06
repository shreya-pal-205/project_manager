import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import validateEmail from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);


  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    // Signup API call...
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        adminInviteToken
      })


      const {token, role} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);

        if(role === "admin"){
          navigate("/admin/dashboard");
        }else{
          navigate("/user/dashboard");
        }
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#4535C1]">
      {/* Left Pane - Gradient Background with Image */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-gradient-to-br from-[#4535C1] via-[#478CCF] to-[#36C2CE] relative overflow-hidden p-8">
        <img
          src="https://www.shutterstock.com/image-vector/business-team-working-together-brainstorming-600nw-1667739283.jpg"
          alt="Signup Banner"
          className="w-4/5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white/20"
        />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#77E4C8] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#4535C1] opacity-30 rounded-full blur-2xl"></div>
      </div>

      {/* Right Pane - Glassmorphism Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-10 bg-[#f5f7fa]">
        <div className="backdrop-blur-lg bg-white/60 border border-white/40 rounded-3xl p-10 w-full max-w-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-center text-[#4535C1] mb-8 tracking-tight">
            Create Account 📝
          </h2>

          {error && (
            <div className="bg-red-600/80 text-white text-center py-2 mb-6 rounded-xl backdrop-blur-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* First row: Full Name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Second row: Password + Admin Token */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Admin Invite Token"
                  type="text"
                  value={adminInviteToken}
                  onChange={(e) => setAdminInviteToken(e.target.value)}
                  placeholder="Enter admin invite token"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#36C2CE] to-[#4535C1] text-white font-semibold py-3 rounded-xl 
              hover:from-[#478CCF] hover:to-[#36C2CE] transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-[#4535C1]/80 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#36C2CE] font-semibold hover:underline hover:text-[#4535C1] transition-all duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
