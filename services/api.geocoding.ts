// api.geocoding.ts

const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1/search";

export interface CityLocation {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

/**
 * Finds the primary geocoded location for a city name using the Open‑Meteo geocoding API.
 *
 * @param name - City name to search; must be non-empty and not only whitespace.
 * @returns The first matching `CityLocation`, or `undefined` if no matches are found.
 * @throws Error if `name` is empty or contains only whitespace.
 * @throws Error if the geocoding API responds with a non-OK HTTP status (message includes status code and status text).
 */
export async function getCityLocation(
  name: string,
): Promise<CityLocation | undefined> {
  if (!name || name.trim().length === 0) {
    throw new Error("Name is required for geocoding");
  }

  const url = `${GEOCODING_BASE}?name=${encodeURIComponent(name)}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Geocoding API request failed (${res.status}): ${res.statusText}`,
    );
  }
  const json = await res.json();
  const results = json.results ?? [];

  return results[0];
}