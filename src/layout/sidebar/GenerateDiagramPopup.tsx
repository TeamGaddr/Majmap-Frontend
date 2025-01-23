import React from 'react';

interface GenerateDiagramPopupProps {
  isOpen: boolean;
}

export const GenerateDiagramPopup: React.FC<GenerateDiagramPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[331px] h-[374.43px] px-4 pt-4 pb-5 bg-[#1e1f1f] rounded-[15px] border border-[#2d2d2d] flex-col justify-center items-center gap-6 inline-flex">
      <div className="self-stretch px-2 py-4 border-b border-[#2d2d2d] justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#cfcece] text-lg font-bold font-['Lato bold 18'] leading-loose">Generate diagram</div>
      </div>

      <div className="self-stretch h-[250.43px] px-2 flex-col justify-start items-center gap-6 flex">
        <div className="self-stretch h-[250.43px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Describe diagram</div>

          <div className="self-stretch justify-start items-center gap-4 inline-flex">
            <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Type</div>
            <div className="grow shrink basis-0 h-[33px] px-4 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-between items-center flex">
              <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Auto-select</div>
              <div className="w-4 h-[7px] relative overflow-hidden" />
            </div>
          </div>

          <div className="self-stretch h-[120px] px-4 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-start items-start gap-2.5 inline-flex">
            <div className="text-[#cfcece] text-[11px] font-medium font-['Lato 12pt']">Tell AI about your diagram in details...</div>
          </div>

          <div className="self-stretch px-5 py-2.5 rounded-[10px] border border-[#2d2d2d] justify-center items-center gap-2.5 inline-flex">
            <div className="text-[#cfcece] text-xs font-semibold font-['Lato 12pt']">Generate</div>
            <div className="w-[17.78px] h-[15.43px] relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
