import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

interface FlowchartNode {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface FlowchartEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

interface FlowchartProps {
  flowchart: {
    nodes: FlowchartNode[];
    edges: FlowchartEdge[];
  };
}

const Flowchart = ({ flowchart }: FlowchartProps) => {
  const { nodes: initialNodes, edges: initialEdges } = flowchart;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <ReactFlowProvider>
      <div style={{ height: "500px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flowchart;
