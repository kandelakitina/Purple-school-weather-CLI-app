set shell := ["fish", "-c"]

dev *args:
    # deno run weather.ts {{args}}
    deno run --watch weather.ts {{args}}
