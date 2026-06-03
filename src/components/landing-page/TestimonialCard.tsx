import { cloudimages, testi_icons } from "../../lib/cloudinary";

type dataprops = {
  name: string;
  city: string;
  area: string;
  review: string;
};

export default function TestimonialCard(
  { data,index }: { data: dataprops, index:number }
) {
  return (
    <article className="bg-white flex flex-col rounded-4xl overflow-hidden  w-80 h-120 z-1 relative">
      {" "}
      <div className="p-15 h-[75%]">
        <p>{data.review}</p>
                <img
          src={testi_icons[index]}
          alt=""
          className="absolute scale-55 right-0 bottom-0 z-1"
        />
      </div>
      <div className="w-full relative flex-1 p-5 justify-end flex-col flex  bg-[#BEE6E1]">

        <span className="font-dmsans font-medium text-claundry-blue">
          {" "}
          {data.name}
        </span>
        <span className="font-dmsans font-medium text-claundry-blue">
          {data.city} , {data.area}
        </span>
      </div>
    </article>
  );
}
