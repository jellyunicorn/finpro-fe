export default function Navbar() {
  return (
    <div className="text-white border border-neutral-50/10  z-10 inset-x-0 mt-10 mx-10 py-5 rounded-full px-8 bg-white/1 backdrop-blur-sm fixed">
      <nav className=" flex justify-between">
        <div>logo</div>
        <div className="flex gap-10">
          <span>ABOUT</span>
          <span>SERVICES</span>
          <span>PRICING</span>
        </div>
        <div>login</div>
      </nav>
    </div>
  );
}
