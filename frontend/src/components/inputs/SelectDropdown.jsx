import React, { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options = [], value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span>{value ? options.find((opt) => opt.value === value)?.label : placeholder || "Select..."}</span>
        <LuChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                value === option.value ? "bg-blue-50 font-semibold" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
