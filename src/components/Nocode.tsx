"use client";

import { Typography, Box } from "@mui/material";
import noCode from "../assets/nocode.svg";

export default function NoCode() {
  return (
    <Box
      className={`w-full flex flex-col lg:flex-row items-center justify-center gap-4 py-8 `}
      sx={{
        padding: { xs: "20px", lg: "50px" },
        borderRadius: "8px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <img
          src={noCode}
          alt="No-code Development with AI Integrations"
          width={400}
          height={400}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>

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
            color: "#003366",
          }}
        >
          No-code Development with AI Integrations
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
          Unlock seamless no-code development with Majmap’s AI integration,
          automating workflows, and visualizing processes. Create, optimize, and
          innovate without coding, amplifying productivity and efficiency.
        </Typography>
      </Box>
    </Box>
  );
}
