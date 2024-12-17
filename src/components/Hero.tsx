import bild from "../assets/bild.svg";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full text-center md:text-left">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src={bild}
          alt="Workflow background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start gap-6 px-6 md:px-16 lg:px-24 py-12 md:py-0 bg-gradient-to-t md:bg-none from-white via-transparent to-transparent">
        <h1 className="text-l md:text-5xl lg:text-3xl font-bold leading-tight text-deep-blue">
          Empower Your Team With AI-Driven Workflow Automation and Visual
          Process Design
        </h1>
        <h3 className="text-base md:text-lg lg:text-xl text-black font-light leading-relaxed">
          Design, automate, and visualize complex workflows effortlessly with no
          code, AI-enhanced tools.
        </h3>
        <button className="px-6 py-3 bg-[#1f3c72] text-white rounded-lg hover:bg-[#1e3765] text-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
