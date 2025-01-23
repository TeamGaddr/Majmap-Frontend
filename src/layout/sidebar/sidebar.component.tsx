import React, { useState } from "react";
import { UploadPopup } from "./UploadPopup";
import { GenerateDiagramPopup } from "./GenerateDiagramPopup";
import { SidebarIcon } from "./SidebarIcon";
import { MoreActionsButton } from "./MoreActionsButton";
import { Templates } from "./Templates";
import Styling from "./Styling"; // Import the Styling component

const ICONS = [
  { src: 'src/assets/data.svg', label: 'Upload data', id: 'upload' },
  { src: 'src/assets/Group 1.svg', label: 'Generate diagram', id: 'generate' },
  { src: 'src/assets/template.svg', label: 'Templates', id: 'templates' },
  { src: 'src/assets/styling.svg', label: 'Styling', id: 'styling' },
];

export default function Sidebar() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleIconClick = (id: string) => {
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <>
      <nav className="w-full h-full pb-2.5 bg-[#1E1F1F] border-r border-[#2E2E2E] flex flex-col items-start gap-7 relative">
        <header className="w-full px-2.5 py-3 border-b border-[#2E2E2E] text-white text-xs font-semibold font-lato text-center">
          Project MajMap
        </header>

        <div className="flex flex-col gap-7 w-full px-2.5">
          {ICONS.map(({ src, label, id }) => (
            <SidebarIcon
              key={id}
              src={src}
              label={label}
              onClick={() => handleIconClick(id)}
            />
          ))}
          
          <MoreActionsButton />
        </div>
      </nav>

      {/* Popups outside of Sidebar */}
      <div className="absolute top-0 left-full w-[300px]">
        <UploadPopup isOpen={activePopup === 'upload'} />
        <GenerateDiagramPopup isOpen={activePopup === 'generate'} />
        <Templates isOpen={activePopup === 'templates'} />
        <Styling isOpen={activePopup === 'styling'} />  {/* Add Styling popup here */}
      </div>
    </>
  );
}
