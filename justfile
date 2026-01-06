set shell := ["fish", "-c"]

dev *args:
    deno run -P --watch weather.ts {{args}}
