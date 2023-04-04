import axios from "axios";
import capitalize from "capitalize";

export default {
  getWeather: async (locationQuery) => {
    /**
     * RapidApi put limitation on free users.
     * Use open-meteo instead.
     */

    const locationData = (
      await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${locationQuery}&language=en&count=1&format=json`
      )
    ).data.results[0];

    let weatherData = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,weathercode,visibility&timeformat=unixtime&forecast_days=1&timezone=${locationData.timezone}`
    );

    const address = (
      await axios.get(
        `https://geocode.maps.co/reverse?lat=${locationData.latitude}&lon=${locationData.longitude}`
      )
    ).data.address;

    weatherData.data.address = address;

    return weatherData;
  },
};
