set shell := ["fish", "-c"]

dev *args:
    deno run --allow-sys --allow-read --allow-write --allow-net --watch weather.ts {{args}}
