import axios from "axios";

export default function (location) {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: location },
    headers: {
      "X-RapidAPI-Key": "c94edc5a54msh35c5e84f991d798p16a9eejsn4dfbe87348a8",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  return axios(options);
}
