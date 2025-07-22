//import React from 'react';

export const MoreActionsButton = () => {
  return (
    <div className="flex flex-col items-center gap-2.5 w-full">
      <div className="w-[53px] h-[52px] p-2.5 rounded-[18px] border border-[#2E2E2E] flex justify-center items-center">
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[5.4px] h-[5.4px] bg-[#E3E3E3] rounded-full"
            />
          ))}
        </div>
      </div>
      <span className="text-[#CFCECE] text-xs font-semibold font-lato">More actions</span>
    </div>
  );
};