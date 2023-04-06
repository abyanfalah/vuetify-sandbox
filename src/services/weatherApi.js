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
      `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,weathercode,visibility&timeformat=unixtime&models=meteofrance_arpege_world&forecast_days=1&timezone=${locationData.timezone}`
    );

    const address = (
      await axios.get(
        `https://geocode.maps.co/reverse?lat=${locationData.latitude}&lon=${locationData.longitude}`
      )
    ).data.address;

    weatherData.data.address = address;

    return weatherData;
  },
  getWeatherName: (weatherCode) => {
    const weather = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "partly cloudy",
      3: "overcast",
      45: "Fog",
      48: "depositing rime fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Dense Drizzle",
      56: "Light Freezing Drizzle",
      57: "Dense Freezing Drizzle",
      61: "Slight Rain",
      63: "Moderate Rain",
      65: "Heavy Rain",
      66: "Light Freezing Rain",
      67: "Heavy Freezing Rain",
      71: "Slight Snow fall",
      73: "Moderate Snow fall",
      75: "Heavy Snow fall",
      77: "Snow grains",
      80: "Slight Rain showers",
      81: "Moderate Rain showers",
      82: "Violent Rain showers",
      85: "Slight Snow showers",
      86: "Heavy Snow showers",
      95: "Slight/Moderate Thunderstorm ",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return capitalize.words(weather[weatherCode]);
  },
};
