
export default function Hero() {
  return (
    <section className="w-full border relative h-dvh p-5 flex flex-col items-center gap-4 bg-[#BAD6F5]">
      <div className=" relative bg-white w-full h-[90%] rounded-[20px] overflow-hidden flex">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 w-full h-full bg-black/10 z-1"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://res.cloudinary.com/dbjnkjxli/video/upload/v1778890512/background_landingpage_n9ltvx.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
        </div>
        <div className="w-full h-full p-10 flex flex-col justify-end">
          {" "}
          <h1 className="relative text-[#D9FFFB] text-4xl font-medium">Fresh Laundy on time, zero effort.</h1>
          <p className="relative text-[#D9FFFB] text-1xl">Schedule a pickup, track your order, and get fresh clothes back — all from your phone.</p>
        </div>
      </div>
      <div className="w-[70%] flex-1 rounded-xl bg-[#296FDA] text-white px-8 py-4 flex items-center">test</div>
    </section>
  );
}
