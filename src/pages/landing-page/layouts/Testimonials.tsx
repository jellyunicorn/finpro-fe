import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import TestimonialCard from "../../../components/landing-page/TestimonialCard";
import { testimonials } from "../../../lib/testimonials";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    Draggable.create(scrollerRef.current, {
      type: "scrollLeft",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
    });
  });

  return (
    <section className="w-full h-200 relative overflow-hidden">
      <div className=" relative flex flex-col pt-25 lg:pt-35 z-1 w-full px-10 lg:px-35  h-full container mx-auto   gap-10">
        <h1 className=" text-2xl  md:text-5xl  text-white">
          Helping you to win at adulting, one fresh laundry at a time!
        </h1>
        <div
          ref={scrollerRef}
          className="overflow-x-auto select-none w-screen -mx-10 md:-mx-18 lg:-mx-35 scrollbar-none"
        >
          <div className="flex gap-5 w-max px-10 lg:px-35">
            {testimonials.map((e, i) => (
              <TestimonialCard key={i} data={e} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
