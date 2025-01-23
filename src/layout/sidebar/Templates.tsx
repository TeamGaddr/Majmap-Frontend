import React from 'react';

interface TemplatesProps {
  isOpen: boolean;
}

export const Templates: React.FC<TemplatesProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[357px] h-[392px] p-4 bg-[#1e1f1f] rounded-[20px] border border-[#2d2d2d] flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#e2e2e2] text-lg font-bold font-['Lato bold ']">Templates</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2d2d2d] bg-transparent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#e2e2e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#e2e2e2] text-sm">Search templates...</span>
        </div>
      </div>

      {/* Flow chart section */}
      <div className="p-4 rounded-lg border border-[#2d2d2d] bg-[#221F26]">
        <h3 className="text-[#e2e2e2] text-sm font-semibold mb-4">Flow chart</h3>
        <div className="flex items-center justify-between gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F2FCE2]"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="w-8 h-8 rounded-lg bg-[#D3E4FD]"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="w-8 h-8 rotate-45 bg-[#FEF7CD] rounded-lg"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="w-8 h-8 rounded-full bg-[#F2FCE2]"></div>
        </div>
      </div>

     {/* Team collaboration section */}
<div className="p-4 rounded-lg border border-[#2d2d2d] bg-[#221F26]">
  <h3 className="text-[#e2e2e2] text-sm font-semibold mb-4">Team collaboration</h3>
  <div className="flex gap-4"> 
    {/* Column of rectangles */}
    <div className="flex flex-col gap pr-3">
      <div className="w-10 h-11 bg-[#E5DEFF]"></div>
      <div className="w-10 h-11 bg-[#F2FCE2]"></div>
      <div className="w-10 h-11 bg-[#FEF7CD]"></div>
    </div>

    {/* Grid of shapes */}
    <div className="flex gap-12"> {/* Changed from grid to flex to align shapes in a row */}
      {/* Circle column */}
      <div className="flex flex-col gap-3">
        <div className="w-9 h-9 rounded-full bg-[#E5DEFF]"></div>
        <div className="w-9 h-9 rounded-full bg-[#F2FCE2]"></div>
        <div className="w-9 h-9 rounded-full bg-[#FEF7CD]"></div>
      </div>

      {/* Square column */}
      <div className="flex flex-col gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#E5DEFF]"></div>
        <div className="w-9 h-9 rounded-lg bg-[#F2FCE2]"></div>
        <div className="w-9 h-9 rounded-lg bg-[#FEF7CD]"></div>
      </div>

      {/* Diamond column */}
      <div className="flex flex-col gap-3">
        <div className="w-9 h-9 rotate-45 bg-[#E5DEFF] rounded-lg"></div>
        <div className="w-9 h-9 rotate-45 bg-[#F2FCE2] rounded-lg"></div>
        <div className="w-9 h-9 rotate-45 bg-[#FEF7CD] rounded-lg"></div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};
