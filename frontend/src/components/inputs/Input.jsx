import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputBg = "rgba(255, 255, 255, 0.6)";
  const borderColor = "rgba(69, 53, 193, 0.4)";
  const textColor = "#4535C1";
  const placeholderColor = "placeholder-gray-500";

  return (
    <div className="mb-6 w-full relative">
      <label className={`block text-sm font-semibold mb-2 text-[#4535C1]`}>
        {label}
      </label>
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${placeholderColor} 
        focus:outline-none focus:ring-2 focus:ring-[#36C2CE]/70 transition-all duration-300`}
        style={{
          backgroundColor: inputBg,
          borderColor: borderColor,
          color: textColor,
          backdropFilter: "blur(10px)",
        }}
      />
      {type === "password" && (
        <div
          className="absolute right-4 top-[45px] cursor-pointer text-[#478CCF] hover:text-[#4535C1] transition-colors duration-300"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
        </div>
      )}
    </div>
  );
};

export default Input;
