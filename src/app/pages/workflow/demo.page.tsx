import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Connection,
  BackgroundVariant,
} from "reactflow";
import { Templates } from "src/layout/sidebar/Templates";
import "reactflow/dist/style.css";

// Initial nodes and edges for the workflow
const initialNodes = [
  {
    id: "1",
    position: { x: 50, y: 50 },
    data: { label: "Node 1", output: "Output 1", color: "#FF5733", shape: "rectangle" },
    style: { backgroundColor: "#FF5733", color: "white", borderRadius: "8px" },
  },
  {
    id: "2",
    position: { x: 200, y: 150 },
    data: { label: "Node 2", output: "Output 2", color: "#33FF57", shape: "circle" },
    style: { backgroundColor: "#33FF57", color: "white", borderRadius: "50%" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeLabel, setNodeLabel] = useState<string>("");
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle double-click on a node to edit it
  const handleNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      setNodeLabel(node.data.label);
    },
    []
  );

  // Update node color
  const updateNodeColor = useCallback(
    (color: string) => {
      if (selectedNode) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === selectedNode.id
              ? {
                  ...n,
                  data: { ...n.data, color },
                  style: { ...n.style, backgroundColor: color },
                }
              : n
          )
        );
      }
    },
    [selectedNode, setNodes]
  );

  // Update node label
  const updateNodeLabel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const label = e.target.value;
      setNodeLabel(label);
      if (selectedNode) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === selectedNode.id
              ? { ...n, data: { ...n.data, label } }
              : n
          )
        );
      }
    },
    [selectedNode, setNodes]
  );

  // Update node shape
  const updateNodeShape = useCallback(
    (shape: string) => {
      if (selectedNode) {
        let borderRadius = "8px";
        let width = "100px";
        let height = "100px";
        let backgroundColor = selectedNode.data.color;

        if (shape === "circle") {
          borderRadius = "50%";
        } else if (shape === "square") {
          width = "100px";
          height = "100px";
          borderRadius = "0%";
        } else if (shape === "triangle") {
          backgroundColor = "transparent";
          width = "0";
          height = "0";
          borderRadius = "0%";
        }

        setNodes((nds) =>
          nds.map((n) =>
            n.id === selectedNode.id
              ? {
                  ...n,
                  data: { ...n.data, shape },
                  style: {
                    ...n.style,
                    borderRadius,
                    backgroundColor,
                    width,
                    height,
                    borderLeft: shape === "triangle" ? "50px solid transparent" : undefined,
                    borderRight: shape === "triangle" ? "50px solid transparent" : undefined,
                    borderBottom: shape === "triangle" ? "100px solid" : undefined,
                  },
                }
              : n
          )
        );
      }
    },
    [selectedNode, setNodes]
  );

  // Handle template selection
  const handleTemplateSelect = useCallback((templateNodes: any[]) => {
    const newNodes = templateNodes.map((node, index) => ({
      ...node,
      id: `template-${Date.now()}-${index}`,
    }));
    setNodes(newNodes);
    setIsTemplatesOpen(false);
  }, [setNodes]);

  // Save the current workflow as a template
  const saveTemplate = async () => {
    const templateData = {
      name: "My Template",
      description: "A description for the template",
      type: "flowchart",
      nodes: nodes,
      edges: edges,
    };

    try {
      const response = await fetch("/api/workflows/save-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        throw new Error("Failed to save template");
      }

      const data = await response.json();
      console.log("Template saved successfully:", data);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  // Add a new node
  const addNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: "New Node", output: "Output", color: "#8645FF", shape: "rectangle" },
      style: { backgroundColor: "#8645FF", color: "white", borderRadius: "8px" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Remove the selected node
  const removeNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#121212]">
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          padding: "20px",
          background: "#1E1F1F", 
          borderRight: "1px solid #2E2E2E", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "60vh",
          position: "fixed",
          right: 0, 
          zIndex: 1,
        }}
      >
        <button
          onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
          className="w-full mb-4 px-4 py-2 bg-[#8645FF] text-white rounded-lg hover:bg-[#6a3cc7] transition-colors"
        >
          Templates
        </button>

        <button
          onClick={saveTemplate}
          className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save Template
        </button>

        <button
          onClick={addNode}
          className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Node
        </button>

        <button
          onClick={removeNode}
          className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Remove Node
        </button>

        {selectedNode ? (
          <>
            <h3 className="text-lg font-semibold mb-4 text-[#E2E2E2]">Edit Node: {selectedNode.data.label}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#E2E2E2]">
                  Label:
                  <input
                    type="text"
                    value={nodeLabel}
                    onChange={updateNodeLabel}
                    className="mt-1 block w-full rounded-md bg-[#2A2B2B] border-[#2E2E2E] text-white focus:border-[#8645FF] focus:ring-[#8645FF] transition-colors"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#E2E2E2]">
                  Color:
                  <input
                    type="color"
                    value={selectedNode.data.color}
                    onChange={(e) => updateNodeColor(e.target.value)}
                    className="mt-1 block w-full h-10 rounded-md border-[#2E2E2E] cursor-pointer"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#E2E2E2]">
                  Shape:
                  <select
                    value={selectedNode.data.shape}
                    onChange={(e) => updateNodeShape(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-[#2A2B2B] border-[#2E2E2E] text-white focus:border-[#8645FF] focus:ring-[#8645FF] transition-colors"
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        ) : (
          <p className="text-[#E2E2E2]">Select a node to edit</p>
        )}
      </div>

      {/* React Flow Pane */}
      <div className="flex-1 relative" style={{ width: "calc(100% - 250px)", height: "88vh", marginLeft: "100px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={handleNodeDoubleClick}
          fitView
          fitViewOptions={{ minZoom: 0.5, maxZoom: 2 }}
          style={{ background: "#121212", width: "100%", height: "100%" }}>
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Templates Popup */}
      {isTemplatesOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <Templates isOpen={isTemplatesOpen} onTemplateSelect={handleTemplateSelect} />
        </div>
      )}
    </div>
  );
}