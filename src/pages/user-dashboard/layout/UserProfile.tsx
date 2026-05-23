export default function UserProfile() {
  return (
    <div className="w-full h-full">
      <div className="border-b border-[#BAD6F5] text-neutral-400 font-medium w-full h-16 flex items-center px-10">
        {" "}
        Home / Reset Password{" "}
      </div>
      <main className=" flex-1 flex px-10 py-10 flex-col">
        <div className="border w-full h-fit flex gap-5">
          <img
            src=""
            alt=""
            className="w-15 h-15 rounded-full bg-neutral-400"
          />
          <div className="flex flex-col  justify-center">
            <span className="text-2xl font-medium text-[#296FDA]">
              User Name
            </span>
            <p className="italic text-neutral-400">member</p>
          </div>
        </div>
        <div className="h-100 rounded-2xl border"></div>
      </main>
    </div>
  );
}
