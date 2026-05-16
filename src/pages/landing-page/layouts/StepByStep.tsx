import { cloudimages } from "../../../lib/cloudinary";
import swoosh from "../../../img/svg/strokes.svg";

export default function StepByStep() {
  return (
    <div className="w-full  bg-[#BAD6F5] flex flex-col py-40">
      <div className=" w-full h-full container mx-auto px-35 gap-10 flex flex-col">
        <div className="flex gap-10">
          <div className="relative ">
            <img
              src={swoosh}
              alt="wash-fold-icon"
              className="absolute z-0 w-[80%]"
            />
            <h1 className="text-7xl relative z-1 font-medium text-[#296FDA]">
              Step By Step
            </h1>
          </div>
          <p className="text-md max-w-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            tempora iure dolorem harum voluptas. Unde voluptate beatae fugiat!
            Quia, modi in? Cum tenetur excepturi vel!
          </p>
        </div>
        <article className="flex flex-col gap-5">
          <div className=" w-full grid grid-cols-6 gap-5 ">
            <div className=""> </div>
            <div className=" flex p-10 justify-center ">
              {" "}
              <img
                src={cloudimages.stepbystep_1}
                alt="process_illustration"
                className="h-full "
              />
            </div>
            <div className=" flex p-10 justify-center items-center">
              {" "}
              <img
                src={cloudimages.stepbystep_2}
                alt="process_illustration"
                className="h-full "
              />
            </div>
            <div className=" flex p-5 justify-center items-center">
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
            <hr className="w-full absolute border-2 border-[#296FDA] z-5"></hr>
            <div className="boder justify-start items-center flex">
              <div className="rounded-full bg-[#296FDA] h-5 w-5"></div>
            </div>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className=" justify-center items-center flex">
                  <div className="rounded-full bg-[#296FDA] h-5 w-5"></div>
                </div>
              ))}
            <div className=" justify-end items-center flex">
              <div className="rounded-full bg-[#296FDA] h-5 w-5"></div>
            </div>
          </div>
          <div className=" w-full grid grid-cols-6 gap-5 ">
            <div className=""> </div>
            <div className=" flex flex-col py-5 justify-start ">
              {" "}
              <span> Step 1: </span>
              <p>
                Choose your laundry type and schedule a pickup time that fits
                your day.
              </p>
            </div>
            <div className=" flex flex-col py-5 justify-start ">
              {" "}
              <span> Step 2: </span>
              <p>
                Provide your address and contact details for easy pickup. when
                your laundry arrived at the outlet of your choosing , our
                workers will weight them !
              </p>
            </div>
            <div className=" flex flex-col py-5 justify-start ">
              {" "}
              <span> Step 3: </span>
              <p>Confirm your order and payment method securely.</p>
            </div>
            <div className=" flex flex-col py-5 justify-start ">
              {" "}
              <span> Step 4: </span>
              <p>
                Track your laundry status and get notified when it's ready for
                delivery.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
