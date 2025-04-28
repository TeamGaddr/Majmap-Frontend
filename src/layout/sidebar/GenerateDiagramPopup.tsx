import React from 'react';

interface GenerateDiagramPopupProps {
  isOpen: boolean;
}

export const GenerateDiagramPopup: React.FC<GenerateDiagramPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[265px] h-[280px] px-4 pt-4 pb-5 bg-[#1e1f1f] rounded-[15px] border border-[#2d2d2d] flex-col justify-center items-center gap-6 inline-flex">
      {/* Content - Size Reduced */}
      <div className="self-stretch h-[220px] px-2 flex-col justify-start items-center gap-6 flex">
        <div className="self-stretch h-[220px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Describe diagram</div>

          {/* Type Selection - Size Reduced */}
          <div className="self-stretch justify-start items-center gap-4 inline-flex">
            <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Type</div>
            <div className="grow shrink basis-0 h-[28px] px-4 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-between items-center flex">
              <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Auto-select</div>
              <div className="w-4 h-[7px] relative overflow-hidden" />
            </div>
          </div>

          {/* Input Box - Size Reduced */}
          <div className="self-stretch h-[100px] px-4 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-start items-start gap-2.5 inline-flex">
            <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Tell AI about your diagram in details...</div>
          </div>

          {/* Generate Button - Size Reduced */}
          <div className="self-stretch px-5 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-center items-center gap-2.5 inline-flex">
            <div className="text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Generate</div>
            <div className="w-[17.78px] h-[15.43px] relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};