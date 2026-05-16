import TestimonialCard from "../../../components/landing-page/TestimonialCard";
import { cloudimages } from "../../../lib/cloudinary";
import { testimonials } from "../../../lib/testimonials";

export default function Testimonials() {
  return (
    <section className="w-full h-252 relative overflow-hidden">
      <div className="absolute w-full h-20 z-2 rounded-b-[80px] bg-[#BAD6F5]"></div>
      <div className="w-full h-full absolute">
        <img
          src={cloudimages.bg_testimonial}
          alt="blue-laundry"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" relative flex flex-col pt-55 z-1 w-full h-full container mx-auto px-35 gap-10">
        <h1 className="text-5xl text-white">
          Helping you to win at adulting, one fresh laundry at a time!
        </h1>
        <div className="flex gap-5 border-amber-50 absolute bottom-45">
            {testimonials.map((e,i)=>(
                <TestimonialCard key={i} data={e} index={i}/>

            ))}
        </div>
      </div>
    </section>
  );
}
