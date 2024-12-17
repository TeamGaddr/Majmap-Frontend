import { Typography, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import custom from "../assets/custome.svg";

export default function Customization() {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start max-w-full text-left font-switzer-13px-regular `}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: { xs: "20px", lg: "50px" },
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", lg: "flex-start" },
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Typography
            variant="inherit"
            component="h1"
            sx={{
              fontWeight: "700",
              fontSize: { xs: "24px", lg: "36px" },
              lineHeight: "44px",
            }}
          >
            Templates and Customization
          </Typography>
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
            Majmap offers customizable templates and dynamic visualizations,
            empowering users to tailor workflows, automate processes, and create
            tailored solutions, streamlining business operations and amplifying
            productivity.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link
              to={""}
              className={`flex items-center gap-2 text-center font-semibold text-lg lg:text-xl leading-[40px] px-4 py-2 bg-[#1f3c72] text-white rounded-lg hover:bg-blue-700 transition`}
            >
              Explore Templates
              <ArrowForward sx={{ fontSize: 30 }} />
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            height: "auto",
          }}
        >
          <img
            src={custom}
            alt="Custom Icon"
            width={400}
            height={400}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>
    </section>
  );
}
