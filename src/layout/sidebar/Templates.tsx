import React, { useState } from 'react';
import templatesData from '@/templates.json';

// Define the Template interface
interface Node {
  id: string;
position: { x: number; y: number };
data: { label: string; output: string; color: string; shape: string };
style: { backgroundColor: string; color: string; borderRadius: string; transform?: string };
}

interface Template {
id: string;
type: 'flowchart' | 'collaboration';
name: string;
description: string;
tags: string[];
nodes: Node[];
}

const templates: Template[] = templatesData as Template[];

interface TemplatesProps {
isOpen: boolean;
onTemplateSelect: (nodes: Node[]) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ isOpen, onTemplateSelect }) => {
const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState<string[]>([]);
const [showSuggestions, setShowSuggestions] = useState(false);

if (!isOpen) return null;

const allTags = Array.from(new Set(templates.flatMap(t => [...t.tags, t.name, t.type])));

const filteredTemplates = templates.filter(template => {
const searchLower = searchTerm.toLowerCase();
return (
template.name.toLowerCase().includes(searchLower) ||
template.type.toLowerCase().includes(searchLower) ||
template.description.toLowerCase().includes(searchLower) ||
template.tags.some(tag => tag.toLowerCase().includes(searchLower))
);
});

const updateSuggestions = (term: string) => {
if (!term) {
setSuggestions([]);
return;
}


const termLower = term.toLowerCase();
const matched = allTags
  .filter((tag) => tag.toLowerCase().includes(termLower) && tag.toLowerCase() !== termLower)
  .slice(0, 5);

setSuggestions(matched);
};

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
setSearchTerm(value);
updateSuggestions(value);
setShowSuggestions(true);
};

const handleSuggestionClick = (suggestion: string) => {
setSearchTerm(suggestion);
setShowSuggestions(false);
updateSuggestions(suggestion);
};

const handleTemplateClick = (template: Template) => {
onTemplateSelect(template.nodes);
};

const handleSaveTemplate = () => {
console.log("Template saved!");
};

return (
<div className="w-[265px] h-[362px] p-3 bg-[#1e1f1f] rounded-[20px] border border-[#2d2d2d] flex-col gap-2">
<div className="flex justify-end items-center mb-4">
<div className="relative flex items-center gap-2 px-3 py-1 rounded-lg border border-[#2d2d2d] bg-transparent w-[250px]">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 10 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#e2e2e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<input
type="text"
placeholder="Search..."
value={searchTerm}
onChange={handleSearchChange}
onFocus={() => setShowSuggestions(true)}
className="bg-transparent text-[#e2e2e2] text-sm outline-none w-full"
/>
{showSuggestions && suggestions.length > 0 && (
<div className="absolute left-0 right-0 top-full mt-1 bg-[#1e1f1f] border border-[#2d2d2d] rounded-lg overflow-hidden z-50">
{suggestions.map((suggestion, index) => (
<div
key={index}
className="px-4 py-2 hover:bg-[#2a2b2b] cursor-pointer text-[#e2e2e2] text-sm"
onClick={() => handleSuggestionClick(suggestion)}
>
{suggestion}
</div>
))}
</div>
)}
</div>
</div>


  <div className="overflow-y-auto max-h-[calc(303px-4rem)] space-y-2 scrollbar-thin scrollbar-thumb-[#2d2d2d] scrollbar-track-[#1e1f1f]">
    {filteredTemplates.map((template) => (
      <div
        key={template.id}
        className="p-2 rounded-lg border border-[#2d2d2d] bg-[#1e1f1f] cursor-pointer hover:bg-[#2a2b2b]"
        onClick={() => handleTemplateClick(template)}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[#e2e2e2] text-sm font-semibold">{template.name}</h3>
          <span className="text-[#e2e2e2] text-xs px-2 py-1 bg-[#2d2d2d] rounded-full">
            {template.type}
          </span>
        </div>
        <p className="text-[#e2e2e2] text-xs mb-2 opacity-75">{template.description}</p>
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-[#2d2d2d] text-[#e2e2e2] rounded-full opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-4 flex justify-center">
    <button
      onClick={handleSaveTemplate}
      className="w-full px-4 py-2 bg-[#2d2d2d] text-[#e2e2e2] text-sm font-semibold rounded-lg hover:bg-[#3a3b3b] transition-colors"
    >
      Save Template
    </button>
  </div>
</div>
);
};
