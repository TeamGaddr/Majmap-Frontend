import { useState } from "react";
import Flowchart from "../components/ReactFlowComponents/Flowchar";

const ReactFlow = () => {
  const [description, setDescription] = useState("");
  const [flowchart, setFlowchart] = useState<any>(null);
  const [finalNodes, setFinalNodes] = useState([]);
  const [finalEdges, setFinalEdges] = useState([]);
  const [generateFlowChart, setGenerateFlowChart] = useState(false);
  const [drawFlowChart, setDrawFlowChart] = useState(false);

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

  const toogleGenerateFlowChart = () => {
    setGenerateFlowChart(!generateFlowChart);
    setDrawFlowChart(false);
  };

  const toogleDrawFlowChart = () => {
    setDrawFlowChart(!drawFlowChart);
    setGenerateFlowChart(false);
  };

  return (
    <section>
      <section>
        <div>
          <button
            className="font-[20px] uppercase border-[2px] border-grey rounded-[20px] p-1 m-2 font-bold"
            onClick={toogleGenerateFlowChart}
          >
            Generate Flowchart with LLama
          </button>
          <button
            className="font-[20px] uppercase border-[2px] border-grey rounded-[20px] p-1 m-2 font-bold"
            onClick={toogleDrawFlowChart}
          >
            Draw FlowChart
          </button>
        </div>
        <div
          className={` ${
            generateFlowChart ? "block" : "hidden"
          } flex flex-col items-center justify-start pt-10 min-h-screen bg-gray-100`}
        >
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
        <div
          className={` ${
            drawFlowChart ? "block" : "hidden"
          } flex flex-col items-center justify-start pt-10 min-h-screen bg-gray-100`}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Draw your own flowchart
          </h1>
        </div>
      </section>
    </section>
  );
};

export default ReactFlow;
