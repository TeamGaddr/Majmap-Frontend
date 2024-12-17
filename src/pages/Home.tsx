import Customization from "../components/Customization";
import Hero from "../components/Hero";
import HowItWorks from "../components/Howitworks";
import NoCode from "../components/Nocode";
import Testimonials from "../components/Testimonials";
import UniversalProcess from "../components/UniversalProcess";

export default function Home() {
  return (
    <>
      <Hero />
      <UniversalProcess/> 
      <Customization />
      <NoCode />
      <HowItWorks />
      <Testimonials />
      {/* <UniversalProcess />
      

     
      <Footer /> */}
    </>
  );
}
