export const formatAttendanceType = (type: string) => {
  switch (type) {
    case "CLOCK_IN":
      return {
        label: "Clock In",
        className: "text-claundry-blue font-semibold",
      };
    case "CLOCK_OUT":
      return { label: "Clock Out", className: "text-red-600 font-semibold" };
    default:
      return { label: type, className: "text-gray-600" };
  }
};
