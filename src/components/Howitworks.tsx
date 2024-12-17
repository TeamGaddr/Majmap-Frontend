import { Typography, Box, Button } from "@mui/material";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Step one",
      description: "Drag-and-drop nodes to create workflows.",
    },
    {
      number: "2",
      title: "Step two",
      description: "Add AI logic or templates to customize.",
    },
    {
      number: "3",
      title: "Step three",
      description: "Collaborate and export workflow into code.",
    },
  ];

  return (
    <section className={`py-12 px-6 bg-whitesmoke text-center `}>
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{ marginBottom: 4, fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        How It Works
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingX: { xs: "16px", sm: "32px" },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
            gap={4}
            sx={{
              textAlign: { xs: "center", md: "left" },
              paddingY: { xs: "12px", md: "24px" },
            }}
          >
            <Typography
              variant="h2"
              fontWeight="700"
              sx={{
                fontSize: { xs: "4rem", md: "6rem" },
                color: "#1f3c72",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {step.number}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  marginBottom: 1,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  lineHeight: "1.6",
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box mt={6}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1f3c72",
            color: "#eef3f7",
            textTransform: "none",
            paddingX: 4,
            paddingY: 1.5,
            fontSize: "1rem",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#10174e" },
          }}
        >
          Request Demo
        </Button>
      </Box>
    </section>
  );
}
