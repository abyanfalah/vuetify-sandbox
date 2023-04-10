import { isDarkColor } from "is-dark-color/dist/isDarkColor";

export default function (color) {
  if (isDarkColor(color)) return "white";
  return "black";
}
