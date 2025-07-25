import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import templatesData from '@/templates.json';
import { LayoutGrid, Users, GitBranch, LineChart, ShoppingCart, Map, Container, UserPlus, Stethoscope, Plus } from 'lucide-react';

// Define TypeScript interfaces
interface Node {
  id: string;
  position: { x: number; y: number };
  data: { 
    label: string;
    output: string;
    color: string;
    shape: string;
  };
  style: {
    backgroundColor: string;
    color: string;
    borderRadius: string;
    transform?: string;
  };
}

interface Template {
  id: string;
  type: 'flowchart' | 'collaboration';
  name: string;
  description: string;
  tags: string[];
  nodes: Node[];
}

const getTemplateIcon = (name: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    'Business Model Canvas': <LayoutGrid size={24} />,
    'Standard Operating Procedure (SOP)': <GitBranch size={24} />,
    'Agile Sprint Planning': <Users size={24} />,
    'Risk Management Matrix': <LineChart size={24} />,
    'Sales Funnel': <ShoppingCart size={24} />,
    'Customer Journey Map': <Map size={24} />,
    'DevOps Pipeline': <Container size={24} />,
    'API Integration Workflow': <GitBranch size={24} />,
    'Employee Onboarding': <UserPlus size={24} />,
    'Patient Admission Process': <Stethoscope size={24} />,
  };
  return icons[name] || <LayoutGrid size={24} />;
};

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const templates: Template[] = templatesData as Template[];
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const handleUseTemplate = (templateId: string) => {
    navigate(`/dashboard/workflow?template=${templateId}`);
  };

  const handleCreateNew = () => {
    navigate('/dashboard/workflow?newTemplate=true');
  };

  return (
      <div className="min-h-screen bg-[#1A1A1A] p-6 overflow-y-auto scroll-smooth">
        <div className="max-w-[1500px] mx-auto">
          {/* Header Section */}
          <div className="sticky top-0 z-10 bg-zinc-90 px-1 py-4">
            <h1 className="text-xl font-bold text-white">Choose Your Template</h1>
          </div>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`bg-[#2A2A2A] rounded-xl border-2 border-gray-600 overflow-hidden transition-all duration-200 flex flex-col aspect-square ${
                  hoveredTemplate === template.id ? 'transform scale-[1.02] border-purple-500 shadow-lg' : ''
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <div className="h-[45%] bg-[#232323] flex items-center justify-center relative p-4 border-b border-[#3A3A3A]">
                  <div className="text-gray-400">
                    {getTemplateIcon(template.name)}
                  </div>
                </div>
                <div className="p-4 flex flex-col h-[55%]">
                  <div className="mb-2">
                    <h3 className="text-md font-semibold text-white line-clamp-1">{template.name}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors text-xs font-medium mt-auto"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          {/* Create New Template Card */}
          <div
            className="bg-[#2A2A2A] rounded-lg border-2 border-dashed border-[#3A3A3A] overflow-hidden hover:border-purple-500 transition-all duration-200 flex flex-col cursor-pointer"
            onClick={handleCreateNew}
          >
            <div className="h-48 bg-[#232323] flex items-center justify-center border-b border-dashed border-[#3A3A3A]">
              <Plus size={32} className="text-gray-400" />
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white mb-2">Custom Template</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Build your own template from scratch
                </p>
              </div>
              <button
                className="w-full bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white py-2.5 rounded-lg transition-colors text-sm font-medium mt-auto"
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;