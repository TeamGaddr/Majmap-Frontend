import React from 'react';

interface SidebarIconProps {
  src: string;
  label: string;
  onClick?: () => void;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ src, label, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity w-full"
    >
      <div className="w-[53px] h-[52px] p-2.5 rounded-[18px] border border-[#2E2E2E] flex justify-center items-center">
        <img src={src} alt={label} className="w-full h-full" />
      </div>
      <span className="text-[#CFCECE] text-xs font-semibold font-lato">{label}</span>
    </div>
  );
};