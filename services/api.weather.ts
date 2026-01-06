// api.weather.ts

import { type GeoLocation, getTopLocation } from "./api.geocoding.ts";

const FORECAST_API = "https://api.openweathermap.org/data/3.0/onecall";

/* -----------------------------
   Types
-------------------------------- */

export interface WeatherResult {
  city: string;
  country?: string;
  latitude: number;
  longitude: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

/* -----------------------------
   Public API
-------------------------------- */

export async function getWeatherByCity(
  city: string,
  options?: {
    language?: string;
    countryCode?: string;
    timezone?: string;
    token?: string;
  },
): Promise<WeatherResult> {
  // token is reserved for future authenticated APIs
  const location = await resolveCity(city, {
    language: options?.language,
    countryCode: options?.countryCode,
  });

  const weather = await fetchCurrentWeather(
    location.latitude,
    location.longitude,
    options?.timezone,
    options?.token,
  );

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    ...weather,
  };
}

/* -----------------------------
   Internal helpers
-------------------------------- */

async function resolveCity(
  city: string,
  options?: {
    language?: string;
    countryCode?: string;
  },
): Promise<GeoLocation> {
  const location = await getTopLocation(city, options);

  if (!location) {
    throw new Error(`City not found: ${city}`);
  }

  return location;
}

async function fetchCurrentWeather(
  latitude: number,
  longitude: number,
  timezone = "auto",
  token?: string,
): Promise<{
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    units: "metric",
    exclude: "minutely,hourly,daily,alerts",
  });

  // token is required for OpenWeatherMap API
  if (token) {
    params.set("appid", token);
  }

  const res = await fetch(`${FORECAST_API}?${params}`);
  if (!res.ok) {
    throw new Error(`Weather request failed (${res.status})`);
  }

  const data = await res.json();

  if (!data.current) {
    throw new Error("No current weather data returned");
  }

  const current = data.current;
  return {
    temperature: current.temp,
    windspeed: current.wind_speed,
    winddirection: current.wind_deg,
    weathercode: current.weather[0].id,
    time: new Date(current.dt * 1000).toISOString(),
  };
}
