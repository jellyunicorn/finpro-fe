import { useNavigate } from "react-router";
import { cloudimages } from "../lib/cloudinary";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-8 bg-[#f7fcff] px-5 font-dmsans text-center">

        <img src={cloudimages.notfoundillus} alt="" className="w-150" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-claundry-blue">
          This page came out in the wash
        </h1>
        <p className="max-w-md text-neutral-500">
          We tumbled through every load but couldn't find what you're looking
          for. It might be hiding with the missing socks.
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="rounded-full bg-claundry-blue px-8 py-3 font-medium text-white transition-all ease-in hover:bg-blue-700 hover:shadow-lg"
      >
        Go back
      </button>
    </main>
  );
}
