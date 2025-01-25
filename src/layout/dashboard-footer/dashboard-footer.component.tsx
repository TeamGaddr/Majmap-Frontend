import React, { useState } from 'react';

const ICONS = [
  { src: 'src/assets/cursor.svg', label: 'Cursor', id: 'cursor' },
  { src: 'src/assets/attach.svg', label: 'Attach', id: 'attacher' },
  { src: 'src/assets/shapes.svg', label: 'Shapes', id: 'shapes' },
  { src: 'src/assets/color.svg', label: 'Color', id: 'color' },
];

const ShapesPopup = () => {
  return (
    <div className="absolute bottom-20 left-[138.5px] bg-[#1e1f1f] rounded-[18.72px] border border-[#2d2d2d] p-4">
      <div className="flex gap-4">
        <button className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors">
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2]" />
        </button>
        <button className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors">
          <div className="w-6 h-4 bg-transparent border border-[#e2e2e2]" />
        </button>
        <button className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors">
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2] rounded-full" />
        </button>
        <button className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors">
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2] rotate-45" />
        </button>
      </div>
    </div>
  );
};

const ColorPopup = () => {
  const colors = [
    '#F2FCE2', '#FEF7CD', '#FEC6A1', '#E5DEFF', 
    '#FFDEE2', '#FDE1D3', '#D3E4FD', '#F1F0FB'
  ];

  return (
    <div className="absolute bottom-20 left-[207.75px] bg-[#1e1f1f] rounded-[18.72px] border border-[#2d2d2d] p-4">
  <div className="grid grid-cols-4 gap-2 w-[125px]">
        {colors.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-lg border border-[#2d2d2d] hover:opacity-80 transition-opacity"
            style={{ backgroundColor: color }}
            aria-label={`Color ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function DashboardFooter() {
  const [showShapesPopup, setShowShapesPopup] = useState(false);
  const [showColorPopup, setShowColorPopup] = useState(false);

  const handleIconClick = (iconId: string) => {
    if (iconId === 'shapes') {
      setShowShapesPopup(!showShapesPopup);
      setShowColorPopup(false);
    } else if (iconId === 'color') {
      setShowColorPopup(!showColorPopup);
      setShowShapesPopup(false);
    }
  };

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-0 p-4">
      {showShapesPopup && <ShapesPopup />}
      {showColorPopup && <ColorPopup />}
      <div className="h-[61.76px] bg-[#1e1f1f] rounded-[18.72px] border border-[#2d2d2d] justify-start items-center inline-flex overflow-hidden">
        {ICONS.map((icon) => (
          <div key={icon.id} className="w-[69.25px] self-stretch border-r border-[#2d2d2d] justify-center items-center gap-[9.36px] flex">
            <button
              className="flex justify-center items-center p-2 w-full h-full hover:bg-[#2d2d2d] rounded-[18.72px] transition-all duration-200"
              aria-label={icon.label}
              onClick={() => handleIconClick(icon.id)}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="h-6 w-auto"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
