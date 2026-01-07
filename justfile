set shell := ["fish", "-c"]

dev *args:
    deno run \
        --allow-read=$HOME/weather-data.json \
        --allow-write=$HOME/weather-data.json \
        --allow-sys=homedir,osRelease \
        --allow-net=geocoding-api.open-meteo.com,api.open-meteo.com \
        --watch \
        weather.ts {{args}}
