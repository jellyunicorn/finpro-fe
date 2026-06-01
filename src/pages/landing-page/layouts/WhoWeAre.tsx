import { cloudimages } from "../../../lib/cloudinary";

export default function WhoWeAre() {
  return (
    <section className="w-full h-170 bg-[#BAD6F5] px-30 py-15 grid grid-cols-2 justify-center items-center">
      <div className=" max-h-125 h-full container mx-auto w-full flex py-15 flex-col justify-center gap-10 items-center">
        <h1 className="text-5xl text-center text-claundry-blue w-[85%] font-medium">
          Effortless laundry care, designed for busy lives.
        </h1>
        <img src={cloudimages.whoWeAre} alt="who-we-are" className="w-[70%]" />
      </div>
      <div className=" h-full max-h-125 w-full py-20 px-20 flex justify-start  items-center flex-col">
        <article className=" max-w-100 flex flex-col gap-5">
          <h2 className="text-7xl text-left w-full text-claundry-blue font-medium">
            Who we are
          </h2>
          <p className="text-sm max-h-70 line-clamp-30 text-[#1D1D1D]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            dolorum inventore aut. Amet nulla minus distinctio rem, esse autem
            iste, modi alias sapiente reiciendis harum optio possimus, ab
            maiores. Sed veniam consequatur iusto totam ad eveniet voluptate
            iste omnis delectus earum vel similique deserunt, fugit quis
            consequuntur. Repellat, est sit impedit voluptate iste minus
            veritatis eligendi quasi at nobis, possimus inventore aut quaerat
            nemo? Voluptatum optio tempore magni vel nihil quis, sunt
            repudiandae cum voluptatibus?
          </p>
        </article>
      </div>
    </section>
  );
}
