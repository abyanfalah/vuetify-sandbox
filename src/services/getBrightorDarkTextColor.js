import isDarkColor from "is-dark-color";

export default function (color) {
  if (!color) return "black";
  if (isDarkColor(color)) return "white";
  return "black";
}
