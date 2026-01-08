import { getArgs } from "./helpers/args.ts";
import { printError, printHelp, printSuccess } from "./services/log.service.ts";
import { getWeatherByCity } from "./services/api.weather.ts";
import { getKeyValue, saveKeyValue } from "./services/storage.service.ts";

/* -----------------------------
   Fetch weather helper
-------------------------------- */
const fetchWeather = async () => {
  const city = await getKeyValue("city");
  if (!city) {
    throw new Error("City is undefined");
  }

  try {
    const weather = await getWeatherByCity(city);

    printSuccess(
      `Weather for ${weather.city}${
        weather.country ? ", " + weather.country : ""
      }:\n` +
        `🌡 Temperature: ${weather.temperature}°C\n` +
        `💨 Wind: ${weather.windspeed} m/s, direction ${weather.winddirection}°\n` +
        `☁ Weather code: ${weather.weathercode}\n` +
        `⏰ Time: ${weather.time}`,
    );
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
  }
};

/* -----------------------------
   CLI Entry point
-------------------------------- */
const initCLI = async () => {
  const { s: city, h: help, l: language } = getArgs(Deno.args);

  if (help) {
    printHelp();
    return;
  }

  if (language) {
    await saveKeyValue("language", language);
  }

  if (city) {
    await saveKeyValue("city", city);
    await fetchWeather();
  } else {
    printError("Please provide a city with -s, or use -h for help.");
  }
};

initCLI();
