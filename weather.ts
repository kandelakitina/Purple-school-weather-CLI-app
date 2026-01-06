import { getArgs } from "./helpers/args.ts";
import { printError, printHelp, printSuccess } from "./services/log.service.ts";
import { saveKeyValue } from "./services/storage.service.ts";
import { getWeatherByCity } from "./services/api.weather.ts";

/* -----------------------------
   Save token helper
-------------------------------- */
const saveToken = async (token: string) => {
  if (!token.length) {
    printError("Token cannot be blank");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved");
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
  }
};

/* -----------------------------
   Fetch weather helper
-------------------------------- */
const fetchWeather = async (city: string) => {
  if (!city.trim()) {
    printError("City cannot be blank");
    return;
  }

  try {
    const weather = await getWeatherByCity(city);

    printSuccess(`Weather for ${weather.city}${weather.country ? ", " + weather.country : ""}:`);
    console.log(`Temperature: ${weather.temperature}°C`);
    console.log(`Wind: ${weather.windspeed} m/s, direction ${weather.winddirection}°`);
    console.log(`Weather code: ${weather.weathercode}`);
    console.log(`Time: ${weather.time}`);
  } catch (error) {
    printError(error instanceof Error ? error.message : String(error));
  }
};

/* -----------------------------
   CLI Entry point
-------------------------------- */
const initCLI = () => {
  const { s: city, h: help, t: token } = getArgs(Deno.args);

  if (help) {
    printHelp();
    return;
  }

  if (token !== undefined) {
    saveToken(token);
  }

  if (city) {
    fetchWeather(city);
  } else if (!token) {
    printError("Please provide a city with -s or token with -t, or use -h for help");
  }
};

initCLI();
