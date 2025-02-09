import React, { useState } from 'react';

interface Icon {
  src: string;
  label: string;
  id: string;
}

const ICONS: Icon[] = [
  { src: 'src/assets/cursor.svg', label: 'Cursor', id: 'cursor' },
  { src: 'src/assets/attach.svg', label: 'Attach', id: 'attacher' },
  { src: 'src/assets/shapes.svg', label: 'Shapes', id: 'shapes' },
  { src: 'src/assets/color.svg', label: 'Color', id: 'color' },
];

const ShapesPopup = (): JSX.Element => {
  return (
    <div className="absolute bottom-20 left-[138.5px] bg-[#1e1f1f] rounded-[18.72px] border border-[#2d2d2d] p-4">
      <div className="flex gap-4">
        <button
          type="button"
          title="Draw square"
          className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors"
        >
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2]" />
        </button>
        <button
          type="button"
          title="Draw rectangle"
          className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors"
        >
          <div className="w-6 h-4 bg-transparent border border-[#e2e2e2]" />
        </button>
        <button
          type="button"
          title="Draw circle"
          className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors"
        >
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2] rounded-full" />
        </button>
        <button
          type="button"
          title="Draw diamond"
          className="w-8 h-8 border border-[#2d2d2d] flex items-center justify-center hover:bg-[#2d2d2d] transition-colors"
        >
          <div className="w-4 h-4 bg-transparent border border-[#e2e2e2] rotate-45" />
        </button>
      </div>
    </div>
  );
};

const ColorPopup = (): JSX.Element => {
  const colors: string[] = [
    '#F2FCE2', '#FEF7CD', '#FEC6A1', '#E5DEFF', 
    '#FFDEE2', '#FDE1D3', '#D3E4FD', '#F1F0FB'
  ];

  return (
    <div className="absolute bottom-20 left-[207.75px] bg-[#1e1f1f] rounded-[18.72px] border border-[#2d2d2d] p-4">
      <div className="grid grid-cols-4 gap-2 w-[125px]">
        {colors.map((color, index) => (
          <button
            key={index}
            type="button"
            className="w-8 h-8 rounded-lg border border-[#2d2d2d] hover:opacity-80 transition-opacity"
            style={{ backgroundColor: color }}
            aria-label={`Color ${index + 1}`}
            title={`Select color ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardFooter: React.FC = (): JSX.Element => {
  const [showShapesPopup, setShowShapesPopup] = useState<boolean>(false);
  const [showColorPopup, setShowColorPopup] = useState<boolean>(false);

  const handleIconClick = (iconId: string): void => {
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
        {ICONS.map((icon: Icon) => (
          <div key={icon.id} className="w-[69.25px] self-stretch border-r border-[#2d2d2d] justify-center items-center gap-[9.36px] flex">
            <button
              type="button"
              className="flex justify-center items-center p-2 w-full h-full hover:bg-[#2d2d2d] rounded-[18.72px] transition-all duration-200"
              aria-label={icon.label}
              title={icon.label}
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
};

export default DashboardFooter;
