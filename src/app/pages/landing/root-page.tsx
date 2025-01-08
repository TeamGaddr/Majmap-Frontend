import Customization from "src/components/Customization";
import Hero from "src/components/Hero";
import HowItWorks from "src/components/Howitworks";
import NoCode from "src/components/Nocode";
import Testimonials from "src/components/Testimonials";
import UniversalProcess from "src/components/UniversalProcess";

export default function RootPage() {
  return (
    <>
      <Hero />
      <UniversalProcess/> 
      <Customization />
      <NoCode />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
