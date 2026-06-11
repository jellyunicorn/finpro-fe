import { cloudimages } from "../../../lib/cloudinary";
import swoosh from "../../../img/svg/strokes.svg";

const steps = [
  {
    image: cloudimages.stepbystep_1,
    text: "Choose your laundry type and schedule a pickup time that fits your day.",
  },
  {
    image: cloudimages.stepbystep_2,
    text: "Provide your address and contact details for easy pickup. when your laundry arrived at the outlet of your choosing , our workers will weight them !",
  },
  {
    image: cloudimages.stepbystep_3,
    text: "Confirm your order and payment method securely.",
  },
  {
    image: cloudimages.stepbystep_4,
    text: "Track your laundry status and get notified when it's ready for delivery.",
  },
];

export default function StepByStep() {
  return (
    <div className="w-full bg-[#BAD6F5] flex flex-col pt-20 pb-5">
      <div className=" w-full h-full container mx-auto px-5 lg:px-35 gap-10 flex flex-col">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative ">
            <img
              src={swoosh}
              alt="wash-fold-icon"
              className="absolute z-0 w-[80%]"
            />
            <h1 className="text-5xl md:text-5xl relative z-1 font-medium text-claundry-blue">
              Step By Step
            </h1>
          </div>
          <p className="text-md max-w-100 z-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            tempora iure dolorem harum voluptas. Unde voluptate beatae fugiat!
            Quia, modi in? Cum tenetur excepturi vel!
          </p>
        </div>

        {/* Mobile: vertical timeline */}
        <article className="flex flex-col md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-claundry-blue h-5 w-5 shrink-0"></div>
                {i < steps.length - 1 && (
                  <div className="w-1 flex-1 bg-claundry-blue"></div>
                )}
              </div>
              <div className="flex flex-col gap-3 pb-8">
                <img
                  src={step.image}
                  alt="process_illustration"
                  className="w-20"
                />
                <span> Step {i + 1}: </span>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </article>

        {/* Desktop: horizontal timeline */}
        <article className="hidden md:flex flex-col gap-5">
          <div className=" w-full grid grid-cols-6 gap-5 ">
            <div className=""> </div>
            <div className=" flex lg:p-7 justify-center ">
              {" "}
              <img
                src={cloudimages.stepbystep_1}
                alt="process_illustration"
                className=" w-full "
              />
            </div>
            <div className=" flex lg:p-8 justify-center items-center">
              {" "}
              <img
                src={cloudimages.stepbystep_2}
                alt="process_illustration"
                className="h-full "
              />
            </div>
            <div className=" flex lg:p-5 justify-center items-center">
              {" "}
              <img
                src={cloudimages.stepbystep_3}
                alt="process_illustration"
                className="w-full "
              />
            </div>
            <div className=" flex  justify-center items-center">
              {" "}
              <img
                src={cloudimages.stepbystep_4}
                alt="process_illustration"
                className=""
              />
            </div>
          </div>
          <div className=" items-center w-full grid grid-cols-6 gap-5 relative ">
            <hr className="w-full absolute border-2 border-claundry-blue z-5"></hr>
            <div className="boder justify-start items-center flex">
              <div className="rounded-full bg-claundry-blue h-5 w-5"></div>
            </div>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className=" justify-center items-center flex">
                  <div className="rounded-full bg-claundry-blue h-5 w-5"></div>
                </div>
              ))}
            <div className=" justify-end items-center flex">
              <div className="rounded-full bg-claundry-blue h-5 w-5"></div>
            </div>
          </div>
          <div className=" w-full grid grid-cols-6 gap-5 ">
            <div className=""> </div>
            {steps.map((step, i) => (
              <div key={i} className=" flex flex-col py-5 justify-start ">
                {" "}
                <span> Step {i + 1}: </span>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
