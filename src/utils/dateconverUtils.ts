export const toDateInput = (iso: string | null) => iso?.slice(0, 10) ?? null;

export const toReadableDateTime = (iso: string | null | undefined): string => {
  if (!iso) return "-";
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return (`${day}/${month} | ${hour12}:${minutes} ${ampm}`);
};

export const toDateMonth = (iso: string | null | undefined): string => {
  if (!iso) return "-";
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
 
  return (`${day}/${month}`);
};

export const dateConverter = (iso: string | null | undefined): string => {
  if (!iso) return "-";
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
  return (`${day}/${month}  ${hour12}:${minutes} ${ampm}`);
};

export const removeTime = (date: string) => {
  return date.split("T")[0];
}

export const removeDate = (date: string | Date) => {
  const localDate = new Date(date);
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  return `${hours}:${minutes}`;
}
