import React from "react";

const InfoCard = ({ icon, label, value, color = "from-[#36C2CE] to-[#4535C1]" }) => {
  return (
    <div className="flex-1 min-w-[180px] bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
      
      {/* Top colored circle or icon */}
      <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${color} text-white`}>
        {icon || <span className="font-bold text-lg">📊</span>}
      </div>

      {/* Value */}
      <h3 className="text-2xl font-bold text-[#4535C1]">{value}</h3>

      {/* Label */}
      <p className="text-sm font-medium text-[#4535C1]/80 mt-1 text-center">{label}</p>
    </div>
  );
};

export default InfoCard;
