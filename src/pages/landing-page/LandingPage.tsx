import Navbar from "../../components/landing-page/Navbar";
import Hero from "./layouts/Hero";
import OurService from "./layouts/OurService";
import WhoWeAre from "./layouts/WhoWeAre";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhoWeAre/>
      <OurService/>
    </div>
  );
}
