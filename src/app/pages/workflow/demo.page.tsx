import React, { useCallback, useState } from "react";
import ReactFlow, {
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
import "reactflow/dist/style.css";

// Initial nodes and edges setup
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
  const [nodeLabel, setNodeLabel] = useState<string>(""); // New state to manage the label input

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Add new node with random position
  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}`, output: `Output ${nodes.length + 1}`, color: "#33A1FF", shape: "rectangle" },
      style: { backgroundColor: "#33A1FF", color: "white", borderRadius: "8px" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  // Handle node double-click to edit label
  const handleNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
      setNodeLabel(node.data.label); // Set the initial label into the input
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
      setNodeLabel(label); // Update the local state for the input
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
          // To create a triangle, we use CSS borders
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

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Left Panel: React Flow and Add Node Button */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Commented out the Add Node Button */}
        {/* <button
          onClick={addNode}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1000,
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Node
        </button> */}

        {/* React Flow Component */}
        {/* Commented out React Flow and related components */}
        {/* <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={handleNodeDoubleClick}
          fitView
          fitViewOptions={{ minZoom: 0.5, maxZoom: 2 }}
          style={{ background: "#f4f4f4", borderRadius: "10px", height: "100%" }}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow> */}
      </div>

      {/* Right Panel: Node Editing */}
      <div
        style={{
          width: "300px",
          padding: "20px",
          background: "#fff",
          borderLeft: "1px solid #ccc",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "100vh",
          position: "absolute",
          right: 0,
        }}
      >
        {selectedNode ? (
          <>
            <h3>Edit Node: {selectedNode.data.label}</h3>
            <div>
              <label>
                Label:
                <input
                  type="text"
                  value={nodeLabel} // Bind input value to local state
                  onChange={updateNodeLabel}
                  style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Color:
                <input
                  type="color"
                  value={selectedNode.data.color}
                  onChange={(e) => updateNodeColor(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
              </label>
            </div>
            <div>
              <label>
                Shape:
                <select
                  value={selectedNode.data.shape}
                  onChange={(e) => updateNodeShape(e.target.value)}
                  style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                >
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                </select>
              </label>
            </div>
          </>
        ) : (
          <p>Select a node to edit</p>
        )}
      </div>
    </div>
  );
}