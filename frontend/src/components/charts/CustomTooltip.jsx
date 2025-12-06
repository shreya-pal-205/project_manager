import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-red-200 rounded-lg shadow-md p-3 text-sm min-w-[120px]">
        <p className="font-semibold text-red-700">{payload[0].name}</p>
        <p className="mt-1 text-red-500">
          Count:{" "}
          <span className="font-bold text-red-800">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;

