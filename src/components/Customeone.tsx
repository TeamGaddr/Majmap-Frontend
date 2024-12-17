import { Typography, Box } from "@mui/material";

interface CustomerOneProps {
  className?: string;
  customerImage: string; // Changed from customerThree for clarity
  customerName: string;
  role?: string;
  testimonial?: string;
}

const CustomerOne = ({
  className = "",
  customerImage,
  customerName,
  role = "Small business owner",
  testimonial = "Since integrating this solution into our workflow, we have experienced a significant improvement in efficiency and collaboration.",
}: CustomerOneProps) => {
  return (
    <Box
      className={`flex-1 [backdrop-filter:blur(47px)] rounded-xl bg-white flex flex-col items-start justify-center p-6 box-border gap-[18px] min-w-[288px] max-w-full text-left text-5xl text-deep-blue font-switzer-13px-regular ${className}`}
    >
      <Box className="self-stretch flex flex-row items-center justify-start py-0 pl-0 pr-[78px] gap-[18px] mq450:flex-wrap mq450:pr-5 mq450:box-border">
        {/* Handle both imported and URL images */}
        <img
          className="h-[50px] w-[50px] relative rounded-31xl overflow-hidden shrink-0 object-cover"
          loading="lazy"
          width={50}
          height={50}
          alt={`${customerName}'s profile picture`}
          src={customerImage}
        />
        <Box className="flex-1 flex flex-col items-start justify-start min-w-[123px]">
          <Typography variant="h5">{customerName}</Typography>
          <Box className="relative text-base text-black">{role}</Box>
        </Box>
      </Box>
      <Box className="relative text-xl leading-[28px] text-black mq450:text-base mq450:leading-[22px]">
        {testimonial}
      </Box>
    </Box>
  );
};

export default CustomerOne;
