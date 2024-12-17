import { Typography } from "@mui/material";
import universalProcess from "../assets/universal.svg";

export default function UniversalProcess() {
  return (
    <section
      className={`w-full flex flex-col items-center justify-center bg-[#f8f8f8] px-5 py-10 `}
    >
      <div
        className={`flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-[1200px]`}
      >
        <div className="flex justify-center items-center w-full max-w-[400px]">
          <img
            src={universalProcess}
            alt="Universal Process Visualization"
            width={400}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "4px",
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center gap-4 w-full max-w-[500px]">
          <h1 className="font-bold text-[#003366] text-2xl sm:text-3xl lg:text-4xl leading-tight">
            Universal process creation and visualization
          </h1>
          <Typography
            variant="inherit"
            component="h3"
            sx={{
              fontWeight: "400",
              fontSize: { xs: "16px", lg: "24px" },
              lineHeight: "40px",
              color: "#333",
            }}
          >
            Majmap universal process creation and visualization feature enables
            users to design, visualize, and optimize workflows using intuitive,
            no-code tools, while AI integration enhances automation,
            collaboration, and real-time process adjustments.
          </Typography>
        </div>
      </div>
    </section>
  );
}
