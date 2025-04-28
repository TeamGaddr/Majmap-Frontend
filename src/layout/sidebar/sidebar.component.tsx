import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Use absolute paths from src/
const ICONS = [
  { src: '/assets/data.svg', label: 'Upload data', id: 'upload', path: '/dashboard/upload' },
  { src: '/assets/Group 1.svg', label: 'Generate diagram', id: 'generate', path: '/dashboard/generate' },
  { src: '/assets/template.svg', label: 'Templates', id: 'templates', path: '/dashboard/templates' },
  { src: '/assets/workflow.svg', label: 'Workflow', id: 'workflow', path: '/dashboard/workflow' },
  { src: '/assets/styling.svg', label: 'Create', id: 'create', path: '/dashboard/create' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-full">
      <nav className="w-[106px] h-full bg-[#1E1F1F] border-r border-[#2E2E2E] flex flex-col">
        <div className="flex flex-col gap-4 pt-4 px-2">
          {ICONS.map(({ src, label, id, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`
                w-15 h-15 p-2 rounded-2xl
                flex flex-col items-center justify-center
                border
                ${isActive(path) 
                  ? 'border-[rgba(186,134,252,1)] ' 
                  : 'border-transparent hover:border-[rgba(186,134,252,1)] '
                }
                transition-colors
              `}
            >
              <img 
                src={src} 
                alt={label} 
                className="w-6 h-6"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/assets/default-icon.svg';
                }}
              />
              <span className="text-[#E2E2E2] text-[10px] mt-1">{label}</span>
            </button>
          ))}
          
          <button className="
            w-13 h-13 p-2 rounded-2xl
            flex flex-col items-center justify-center
            border border-transparent
            hover:border-[rgba(186,134,252,1)]
            transition-colors
            mt-auto mb-2
          ">
            <span className="text-[#E2E2E2] text-xl">•••</span>
            <span className="text-[#E2E2E2] text-[10px] mt-1">More actions</span>
          </button>
        </div>
      </nav>
    </div>
  );
}