type verifydataprops = {
  verifydata: string;
};

export default function Verifylabel({ verifydata }: verifydataprops) {
  return (
    <div className="flex gap-5 items-center">
      <div
        className={`${verifydata ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"} w-fit h-fit  px-5 py-1 rounded-full whitespace-nowrap`}
      >
        {verifydata && <p>Email Verified</p>}
        {!verifydata && <p>Email not yet verified</p>}
      </div>
    </div>
  );
}
