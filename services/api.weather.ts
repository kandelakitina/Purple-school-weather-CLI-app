// services/api.weather.ts

const WEATHER_BASE = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherResult {
  city: string;
  country?: string;
  temperature: number;
  time: string;
}

export async function getWeather(
  latitude: number,
  longitude: number,
  token: string,
): Promise<WeatherResult> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    token: String(token),
    current_weather: "true",
  });

  const res = await fetch(`${WEATHER_BASE}?${params}`);
  if (!res.ok) {
    throw new Error(`Weather request failed (${res.status})`);
  }
  const data = await res.json();

  if (!data.current_weather) {
    throw new Error("No current weather data returned");
  }

  return data.current_weather;
}
