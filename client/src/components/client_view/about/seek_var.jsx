import React from "react";

const SeekBar = ({ name, percent }) => {
  return (
    <div>
      <div className="skill">
        <div className="flex justify-between font-semibold">
          <span>{name}</span>
          <span>{percent}%</span>
        </div>
        <div className="bg-[#dfe4e6] h-2 rounded-sm overflow-hidden">
          <div
            className="p-2 bg-[#2196f3]"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SeekBar;
