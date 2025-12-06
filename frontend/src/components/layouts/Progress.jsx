import React from "react";

const Progress = ({ progress = 0, status = "Pending" }) => {
  const getColor = () => {
    switch (status) {
      case "In Process":
        return "from-cyan-400 to-cyan-600 text-cyan-400";
      case "Completed":
        return "from-green-400 to-green-600 text-green-400";
      default:
        return "from-violet-400 to-violet-600 text-violet-400";
    }
  };

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden shadow-inner">
        {/* Animated bar */}
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      {/* Progress text */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-400 tracking-wide">
          {status === "Completed" ? "Done 🎯" : status}
        </p>
        <p
          className={`text-xs font-semibold ${getColor().split(" ")[2]} drop-shadow-sm`}
        >
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default Progress;
