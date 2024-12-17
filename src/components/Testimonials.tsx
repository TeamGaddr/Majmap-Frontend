import { Typography, Box } from "@mui/material";
import CustomerOne from "./Customeone";

// Import your images - adjust the paths according to your project structure
import testimonialImage1 from "../assets/testimonial-image1.svg";
import testimonialImage2 from "../assets/testimonial-image2.svg";
import testimonialImage3 from "../assets/testimonial-image3.svg";

// Define testimonial data
const testimonials = [
  {
    customerImage: testimonialImage1,
    customerName: "Customer One",
    role: "Small business owner",
    testimonial:
      "Since integrating this solution into our workflow, we have experienced a significant improvement in efficiency and collaboration.",
  },
  {
    customerImage: testimonialImage2,
    customerName: "Customer Two",
    role: "Marketing Director",
    testimonial:
      "The platform has revolutionized how we handle our daily operations. Highly recommended!",
  },
  {
    customerImage: testimonialImage3,
    customerName: "Customer Three",
    role: "Tech Lead",
    testimonial:
      "Outstanding support and features that perfectly align with our needs. Exactly what we were looking for.",
  },
];

export default function Testimonials() {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[85px] box-border max-w-full text-center text-17xl text-deep-blue font-heder mq750:pb-[55px] mq750:box-border`}
    >
      <Box className="flex-1 bg-off-white overflow-hidden flex flex-row items-start justify-start pt-[100px] px-0 pb-[15px] box-border max-w-full mq750:pt-[65px] mq750:pb-5 mq750:box-border">
        <Box className="flex-1 flex flex-col items-center justify-start pt-0 px-0 pb-16 box-border gap-12 max-w-full mq750:gap-6 mq750:pb-[42px] mq750:box-border">
          <Box className="w-[1014px] flex flex-col items-center justify-center py-0 px-5 box-border gap-4 max-w-full">
            <Typography
              className="m-0 self-stretch relative mq450:text-3xl mq450:leading-[26px] mq1050:text-10xl mq1050:leading-[35px]"
              variant="inherit"
              component="h1"
              sx={{ fontWeight: "700", lineHeight: "44px" }}
            >
              What People Say?
            </Typography>
            <Typography
              className="m-0 relative text-black mq450:text-lgi mq450:leading-[32px]"
              variant="inherit"
              component="h3"
              sx={{
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "24px",
                lineHeight: "40px",
              }}
            >
              Discover what satisfied customers had to say about their
              experiences with our services
            </Typography>
          </Box>
          <Box className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-5xl font-switzer-13px-regular">
            <Box className="self-stretch flex flex-row items-center justify-center flex-wrap content-center py-0 px-[120px] box-border gap-6 max-w-full mq750:pl-[60px] mq750:pr-[60px] mq750:box-border mq450:pl-5 mq450:pr-5 mq450:box-border">
              {testimonials.map((testimonial, index) => (
                <CustomerOne
                  key={index}
                  customerImage={testimonial.customerImage}
                  customerName={testimonial.customerName}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
