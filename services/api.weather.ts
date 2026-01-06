// api.weather.ts

import { type GeoLocation, getTopLocation } from "./api.geocoding.ts";

const FORECAST_API = "https://api.open-meteo.com/v1/forecast";

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
  },
): Promise<WeatherResult> {
  const location = await resolveCity(city, {
    language: options?.language,
    countryCode: options?.countryCode,
  });

  const weather = await fetchCurrentWeather(
    location.latitude,
    location.longitude,
    options?.timezone,
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
): Promise<{
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current_weather: "true",
    timezone,
  });

  const res = await fetch(`${FORECAST_API}?${params}`);
  if (!res.ok) {
    throw new Error(`Weather request failed (${res.status})`);
  }

  const data = await res.json();

  if (!data.current_weather) {
    throw new Error("No current weather data returned");
  }

  return data.current_weather;
}
