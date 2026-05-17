import Navbar from "../../components/landing-page/Navbar";
import { cloudimages } from "../../lib/cloudinary";
import Footer from "./layouts/Footer";
import Hero from "./layouts/Hero";
import OurService from "./layouts/OurService";
import StepByStep from "./layouts/StepByStep";
import Testimonials from "./layouts/Testimonials";
import WhoWeAre from "./layouts/WhoWeAre";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhoWeAre />
      <OurService />
      <StepByStep />
      <div className=" relative ">
        <Testimonials />
        <Footer />
        <div className="w-full h-full absolute overflow-hidden z-0 inset-0">
            <div className="w-full h-full bg-black/10 absolute z-2"></div>
          <img
            src={cloudimages.bg_testimonial}
            alt="blue-laundry"
            className="w-full h-full object-cover  scale-y-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
