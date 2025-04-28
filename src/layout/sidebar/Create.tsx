import React from "react";

interface StylingProps {
  isOpen: boolean;
}

const Styling: React.FC<StylingProps> = ({ isOpen }) => {
  if (!isOpen) return null; // Don't render the component if `isOpen` is false

  return (
    <div className="w-[265px] h-50 px-6 py-8 bg-[#1e1f1f] rounded-[25px] border border-[#2d2d2d] flex-col justify-center items-center gap-6 inline-flex">
      <div className="self-stretch text-[#e2e2e2] text-xs font-semibold font-['Lato 12pt']">
        Use conditional formatting to automatically style your shapes using colors, icons, and dynamic shapes. Visualize changes in real time and identify patterns in your diagram.
      </div>
      <div className="self-stretch px-5 py-2.5 rounded-[14px] border border-[#2d2d2d] justify-center items-center gap-2.5 inline-flex">
        <div className="text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Upload</div>
      </div>
    </div>
  );
};

export default Styling;
