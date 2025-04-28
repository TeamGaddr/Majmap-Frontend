import React, { useState } from 'react';
import { useReactFlow, Node, Edge, ReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowPage = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      position: { x: 100, y: 100 },
      data: { label: 'Start Node' },
      type: 'input',
    },
    {
      id: '2',
      position: { x: 300, y: 100 },
      data: { label: 'Process Node' },
    },
    {
      id: '3',
      position: { x: 500, y: 100 },
      data: { label: 'End Node' },
      type: 'output',
    },
  ]);

  const [edges] = useState<Edge[]>([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ]);

  useReactFlow();

  const handleAddNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}` },
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#2E2E2E]">
        <h1 className="text-2xl font-bold text-white">Workflow Editor</h1>
      </div>

      {/* Toolbar */}
      <div className="p-2 bg-[#1E1F1F] border-b border-[#2E2E2E] flex gap-2">
        <button
          onClick={handleAddNode}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Add Node
        </button>
        <button className="px-4 py-2 bg-[#2D2D2D] hover:bg-[#3E3E3E] text-white rounded-lg transition-colors">
          Save Workflow
        </button>
      </div>

      {/* ReactFlow Canvas */}
      <div className="flex-grow bg-[#1B1B1B] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            setNodes((prevNodes) => {
              const newNodes = [...prevNodes];
              changes.forEach((change) => {
                if (change.type === 'position' && change.dragging) {
                  const node = newNodes.find((n) => n.id === change.id);
                  if (node) {
                    node.position = {
                      x: change.position?.x || node.position.x,
                      y: change.position?.y || node.position.y,
                    };
                  }
                }
              });
              return newNodes;
            });
          }}
          nodeTypes={{
            default: ({ data }) => (
              <div className="px-4 py-2 bg-[#2D2D2D] border border-[#3E3E3E] rounded-lg text-white">
                {data.label}
              </div>
            ),
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          fitView
        >
          <div className="absolute bottom-4 right-4 text-xs text-[#A0A0A0]">
            Drag to pan, Scroll to zoom
          </div>
        </ReactFlow>
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-[#1E1F1F] border-t border-[#2E2E2E] text-sm text-[#A0A0A0]">
        {nodes.length} nodes, {edges.length} connections
      </div>
    </div>
  );
};

export default WorkflowPage;