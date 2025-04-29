import React, { useState } from 'react';
import { Search } from 'lucide-react';

const WorkflowPage: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // New state for workflow input
  const [workflowName, setWorkflowName] = useState('');
  const [description, setDescription] = useState('');

  // New state to store all workflows
  const [workflows, setWorkflows] = useState<
    { id: number; name: string; version: string; description: string }[]
  >([]);

  const handleSubmit = () => {
    if (!workflowName.trim() || !description.trim()) return;

    const newWorkflow = {
      id: workflows.length + 1,
      name: workflowName,
      version: '1.0',
      description,
    };

    setWorkflows([...workflows, newWorkflow]);
    setWorkflowName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 overflow-y-auto scroll-smooth text-white">
      <div className="max-w-[1500px] mx-auto">
        <div className="sticky top-0 z-10 bg-zinc-90 px-1 py-4">

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-[#3A3A3A] mt-6 mb-6">
            <button className="pb-2 text-white border-b-2 border-purple-500 font-semibold">
              Workflow Definitions
            </button>
            <button className="pb-2 text-gray-400 hover:text-white transition-colors">
              Workflow Instances
            </button>
          </div>

          {/* Search & Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Workflow"
                className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg pl-10 pr-4 py-2 text-white w-full"
              />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md"
            >
              + New Workflow
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#1A1A1A] p-6 rounded-xl w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
                <h2 className="text-white font-semibold mb-4">New Workflow</h2>

                <label className="block text-white mb-1">Workflow Name</label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Workflow1"
                  className="w-full mb-4 px-4 py-2 rounded border border-[#3A3A3A] bg-transparent text-white"
                />

                <label className="block text-white mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description..."
                  className="w-full h-24 px-4 py-2 rounded border border-[#3A3A3A] bg-transparent text-white mb-2"
                />

                <p className="text-gray-400 text-sm mb-6">
                  This is a hint text to help user.
                </p>

                <div className="flex gap-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-16 py-2 border border-white text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-16 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                    disabled={!workflowName.trim() || !description.trim()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Section */}
          <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-left text-white">
              <thead className="bg-[#232323]">
                <tr>
                  <th className="px-6 py-4 border-b border-[#3A3A3A]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-600 bg-[#1A1A1A] border-gray-500 rounded"
                      />
                      <span>ID</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b border-[#3A3A3A]">Name</th>
                  <th className="px-6 py-4 border-b border-[#3A3A3A]">Version</th>
                  <th className="px-6 py-4 border-b border-[#3A3A3A]">Description</th>
                </tr>
              </thead>

              <tbody>
                {workflows.length === 0 ? (
                  <tr
                    className={`transition-all ${hoveredRow === 'empty' ? 'bg-[#292929]' : ''}`}
                    onMouseEnter={() => setHoveredRow('empty')}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td colSpan={4} className="text-center py-8 text-gray-400">
                      There is no workflow definitions to show
                    </td>
                  </tr>
                ) : (
                  workflows.map((workflow) => (
                    <tr key={workflow.id} className="hover:bg-[#292929] transition-colors">
                      <td className="px-6 py-4 border-b border-[#3A3A3A]">{workflow.id}</td>
                      <td className="px-6 py-4 border-b border-[#3A3A3A]">{workflow.name}</td>
                      <td className="px-6 py-4 border-b border-[#3A3A3A]">{workflow.version}</td>
                      <td className="px-6 py-4 border-b border-[#3A3A3A]">{workflow.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;
