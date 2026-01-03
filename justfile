set shell := ["fish", "-c"]

dev *args:
    deno run --watch weather.ts {{args}}
