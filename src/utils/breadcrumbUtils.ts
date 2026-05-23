export const formatLabel = (text: string) => {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (initial) => initial.toUpperCase());
};
