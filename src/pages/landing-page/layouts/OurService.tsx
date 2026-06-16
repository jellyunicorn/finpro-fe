import { cloudimages } from "../../../lib/cloudinary";
import swoosh from "../../../img/svg/strokes.svg";

export default function OurService() {
  return (
    <section className="w-full h-fit bg-[#F5F5F0] ">
      <h1 className="text-5xl text-left container mx-auto px-35 pt-20 lg:text-7xl text-claundry-blue font-medium">
        Our Services
      </h1>
      <div className="w-full  gap-30 h-fit flex flex-col  justify-start items-start py-20 container mx-auto px-10 lg:px-35">
        <article className=" grid lg:grid-cols-2 w-full h-fit gap-10 rounded-2xl">
          <div className=" rounded-2xl bg-neutral-300  relative">
            <img
              src={cloudimages.icon_wash_1}
              alt="wash-fold-icon"
              className="absolute -top-10 -left-10 lg:-top-15 lg:-left-15 z-1 w-20 lg:w-25"
            />
            <img
              src={cloudimages.icon_wash_2}
              alt="wash-fold-icon"
              className="absolute -bottom-5  -right-5  z-1 w-15 lg:w-25"
            />
            <div className="w-full h-full overflow-hidden rounded-2xl">
              <img
                src={cloudimages.washfold}
                alt="wash-fold"
                className="object-cover w-full h-full scale-200 "
              />
            </div>
          </div>
          <div className=" flex flex-col gap-5 justify-between ">
            <div className="text-claundry-blue">
              <div className="relative ">
                <h2 className="text-4xl relative z-1 font-medium ">
                  Wash & Fold
                </h2>
                <img
                  src={swoosh}
                  alt="wash-fold-icon"
                  className="absolute z-0 w-40 inset-0"
                />
              </div>
              <p className="text-lg relative z-1">
                Effortless laundry care, designed for busy lives.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <h3 className="text-claundry-blue font-bold text-lg">
                  Professional cleaning care
                </h3>
                <p>
                  Lights and darks are separated and washed in cold water.
                  Hypoallergenic detergent and fabric softener are free upon
                  request.
                </p>
              </div>
              <div>
                <h3 className="text-claundry-blue font-bold text-lg">
                  Ready to wear
                </h3>
                <p>
                  Your clothes are delivered to your door, crisply folded and
                  your socks paired, ready to be worn or put into drawers.
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className=" grid lg:grid-cols-2 w-full h-fit gap-10 rounded-2xl">
          <div className=" rounded-2xl bg-neutral-300 relative ">
            <img
              src={cloudimages.icon_dryclean_2}
              alt="wash-fold-icon"
              className="absolute -top-10 -right-5 z-1 w-20"
            />
            <img
              src={cloudimages.icon_dryclean_1}
              alt="wash-fold-icon"
              className="absolute -bottom-5 -left-5 z-1 w-20"
            />
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={cloudimages.dryclean}
                alt="wash-fold"
                className="object-cover w-full h-full object-center scale-150"
              />
            </div>
          </div>
          <div className=" flex flex-col  gap-5 justify-between ">
            <div className="text-claundry-blue">
              <div className="relative w-fit">
                {" "}
                <h2 className="text-4xl font-medium relative z-1 whitespace-nowrap">
                  Premium Dry Cleaning
                </h2>
                <img
                  src={swoosh}
                  alt="wash-fold-icon"
                  className="absolute z-0 w-50 -top-5 right-2 scale-y-[-1]"
                />
              </div>
              <p className="text-lg relative z-1">
                Expert garment care, tailored for your lifestyle.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              <div>
                <h3 className="text-claundry-blue font-bold text-lg">
                  Expert cleaning and stain removal{" "}
                </h3>
                <p>
                  We carefully follow the care label and inspect your clothes
                  for stains to ensure they receive the optimal treatment.
                </p>
              </div>
              <div>
                <h3 className="text-claundry-blue font-bold text-lg">
                  Pressed and returned on hangers{" "}
                </h3>
                <p>
                  Your clothes are delivered to your door crisply pressed, put
                  on hangers, placed in protective garment bags, and ready to
                  wear.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
