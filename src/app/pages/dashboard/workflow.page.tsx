import React from "react";
import { Chrome, Github, Slack } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="bg-black text-white px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Easy and convenient workflows at your fingertips</h1>
        <p className="text-lg mb-6">
          Create, or use our brilliantly structured templates. Assisted and generated workflows using AI, all your diagramming needs in one place.
        </p>
        <button className="bg-purple-500 text-white px-6 py-3 rounded mb-4">Sign up free</button>
        <div className="mt-4">
          <p className="text-gray-400 mb-2">or continue with</p>
          <div className="flex space-x-4">
            <button className="flex items-center gap-2 border border-white px-4 py-2 rounded">
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center gap-2 border border-white px-4 py-2 rounded">
              <Github className="w-4 h-4" /> GitHub
            </button>
            <button className="flex items-center gap-2 border border-white px-4 py-2 rounded">
              <Slack className="w-4 h-4" /> Slack
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* Replace with your actual image path */}
      </div>
    </section>
  );
};

export default Hero;
