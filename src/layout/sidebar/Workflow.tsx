import React from 'react';

interface WorkflowProps {
  isOpen: boolean;
}

export const Workflow: React.FC<WorkflowProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[300px] h-full bg-[#1E1F1F] border-r border-[#2E2E2E] shadow-lg">
      <header className="h-[60px] border-b border-[#2E2E2E] flex items-center px-4">
        <h2 className="text-[#E2E2E2] text-sm font-semibold">Workflow</h2>
      </header>
      <div className="p-4">
        <p className="text-[#E2E2E2] text-sm">Workflow management panel</p>
      </div>
    </div>
  );
};