set shell := ["fish", "-c"]

dev *args:
    deno run --allow-net=geocoding-api.open-meteo.com,api.open-meteo.com weather.ts {{args}}
