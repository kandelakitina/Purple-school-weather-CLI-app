// services/api.weather.ts

const WEATHER_BASE = "https://api.openweathermap.org/data/3.0/onecall";

export interface WeatherResult {
  temperature: number;
  time: string; // city-local HH:MM
}

function formatCityLocalTime(
  utcSeconds: number,
  timezoneOffsetSeconds: number,
): string {
  const localTimeMs = (utcSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localTimeMs);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export async function getWeather(
  latitude: number,
  longitude: number,
  token: string,
): Promise<WeatherResult> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    appid: token,
    units: "metric",
    exclude: "minutely,hourly,daily,alerts",
  });

  const res = await fetch(`${WEATHER_BASE}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Weather request failed (${res.status})`);
  }

  const data = await res.json();

  if (!data.current || typeof data.timezone_offset !== "number") {
    throw new Error("Invalid weather data returned");
  }

  return {
    temperature: data.current.temp,
    time: formatCityLocalTime(
      data.current.dt,
      data.timezone_offset,
    ),
  };
}
