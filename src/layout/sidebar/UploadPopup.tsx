import React from 'react';

interface UploadPopupProps {
  isOpen: boolean;
}

export const UploadPopup: React.FC<UploadPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[265px] h-[170px] px-6 pt-[2px] pb-5 bg-[#1e1f1f] rounded-[26px] border border-[#2d2d2d] flex-col justify-between items-center inline-flex overflow-hidden">
      <div className="self-stretch text-[#cfcece] text-xs font-semibold font-['Lato 12 pt']">
        <ul className="list-disc pl-5 space-y-1">
          <li>Visualize your data</li>
          <li>Refresh your data source to see live updates</li>
          <li>Import data from Google Sheets, Excel, CSV, and more.</li>
        </ul>
      </div>

      <button className="self-stretch mt-2 px-5 py-2.5 rounded-[14px] border border-[#2d2d2d] justify-center items-center gap-2.5 inline-flex hover:border-[rgba(186,134,252,1)] hover:bg-[#2A2B2B] transition-colors">
        <div className="text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Upload</div>
      </button>
    </div>
  );
};