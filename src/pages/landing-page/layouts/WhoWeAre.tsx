import { cloudimages } from "../../../lib/cloudinary";

export default function WhoWeAre() {
  return (
    <section className="w-full h-fit bg-[#BAD6F5] py-5 lg:px-30 lg:py-15 grid lg:grid-cols-2 justify-center items-center">
      <div className=" max-h-125 h-full container mx-auto w-full flex  flex-col justify-center gap-10 items-center">
        <h1 className="text-4xl lg:text-5xl text-center text-claundry-blue w-[85%] font-medium">
          Effortless laundry care, designed for busy lives.
        </h1>
        <img src={cloudimages.whoWeAre} alt="who-we-are" className="w-70 lg:w-100" />
      </div>
      <div className=" h-full max-h-125 w-full  px-10 pb-20 lg:px-5 flex justify-start  items-center flex-col">
        <article className=" w-full lg:max-w-150 mt-15 flex flex-col gap-5">
          <p className="md:text-2xl text-lg text-claundry-blue line-clamp-30 ">
            Claundry started with a simple idea: nobody's free time should be
            spent sorting socks. We're a team of laundry obsessives who believe
            clean clothes should arrive like magic — picked up from your door,
            washed with care at a trusted outlet near you, and delivered back
            fresh, folded, and ready to wear. 
            
            From a single pair of jeans to a
            mountain of weekend laundry, we handle every load like it's our own.
            You live your life; we'll handle the spin cycle.
          </p>
        </article>
      </div>
    </section>
  );
}
