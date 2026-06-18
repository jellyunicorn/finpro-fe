
type timesummaryprops = {
    data?:string | undefined | null
}

export default function TimeSummary({data}:timesummaryprops) {
  const parsed = new Date(data ?? "");
  const isValid = !!data && !isNaN(parsed.getTime());

  const date = isValid ? parsed.getDate() : "-";
  const month = isValid
    ? parsed.toLocaleString("en-GB", { month: "short" })
    : "-";
  const time = isValid
    ? parsed.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <div className="flex flex-col text-left w-full my-1 ">
      <span className={`${date !== "-" && month !== "-" && "bg-claundry-blue text-white"} px-2  rounded-full w-fit`}>
        {date} {month}
      </span>
      <span className="text-neutral-400 px-3 w-fit ">{time}</span>
    </div>
  );
}
