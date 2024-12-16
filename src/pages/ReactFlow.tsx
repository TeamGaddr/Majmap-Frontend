import { useState } from "react";
import Flowchart from "../components/ReactFlowComponents/Flowchar";

const ReactFlow = () => {
  const [description, setDescription] = useState("");
  const [flowchart, setFlowchart] = useState<any>(null);
  const [finalNodes, setFinalNodes] = useState([]);
  const [finalEdges, setFinalEdges] = useState([]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleGenerateFlowchart = async () => {
    console.log("starting..");
    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flowchart");
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      const messageContent = data.choices[0].message.content;

      const jsonMatch = messageContent.match(/```([\s\S]*?)```/);

      if (jsonMatch && jsonMatch[1]) {
        const jsonString = jsonMatch[1];

        const flowchartData = JSON.parse(jsonString);

        const { nodes, edges } = flowchartData;
        setFinalNodes(nodes);
        setFinalEdges(edges);

        setFlowchart({ nodes, edges });
      } else {
        throw new Error("Failed to extract JSON from message content");
      }
    } catch (error) {
      console.log("Error generating flowchart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        React Flow with Dynamic Flowchart
      </h1>
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Describe your flowchart"
        className="w-3/4 md:w-1/2 p-3 text-lg border-2 border-blue-500 rounded-md focus:outline-none focus:border-blue-600 mb-4"
      />
      <button
        onClick={handleGenerateFlowchart}
        className="w-3/4 md:w-1/2 p-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none mb-6"
      >
        Generate Flowchart
      </button>
      <div className="w-3/4 md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        {flowchart && <Flowchart flowchart={flowchart} />}
      </div>
    </div>
  );
};

export default ReactFlow;
