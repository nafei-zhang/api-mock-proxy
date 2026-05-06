# api-mock-proxy

Meridian Request Suite is a browser extension project for request interception and response overriding. It intercepts `fetch` and `XMLHttpRequest` calls at runtime and returns mocked responses based on your rules. It is useful for frontend debugging, API simulation, edge-case testing, and failure-mode rehearsal.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development Commands](#development-commands)
- [Build and Release](#build-and-release)
- [E2E](#e2e)
- [Rule Capabilities](#rule-capabilities)
- [Troubleshooting](#troubleshooting)

## Features

- Intercepts `fetch` and `XMLHttpRequest`.
- Matches requests by `method + url + body + headers`.
- Overrides response `body`, `status code`, `headers`, and `delay`.
- Supports chunked responses and `ArrayBuffer` response type.
- Supports variables with RegExp matching (capture in request, reuse in response).
- Supports tree-based rule management (Domain / Folder / Request) with priority ordering.
- Supports import/export of rules in JSON format.
- Includes request-match analysis tools for debugging unmatched rules.

## Project Structure

```text
api-mock-proxy/
├── src/
│   ├── injected/        # In-page runtime: hooks fetch/xhr
│   ├── content/         # Content script bridge
│   ├── background/      # Extension background
│   └── popup/           # Extension UI
├── e2e/                 # E2E environment (local mock site + GraphQL mock)
├── scripts/             # Build and packaging scripts
├── public/              # Static assets
├── build/               # Raw webpack output
└── dist/                # Final extension output after post-processing
```

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Build the extension

```bash
npm run build
```

This generates both `build/` and `dist/`. Use `dist/` to load/publish the extension.

### 3) Load extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist/` folder

## Development Commands

```bash
# Production build + dist output
npm run build

# Clean build artifacts
npm run clean

# Unit tests
npm test

# Start local E2E server (from repo root)
npm run e2e

# Storybook
npm run storybook
npm run build-storybook
```

## Build and Release

### `build/` vs `dist/`

- `build/`: raw production artifacts generated directly by webpack.
- `dist/`: final release artifacts after additional extension-specific processing.

### `dist/` post-processing includes

- Renaming `index.html` to `popup.html`
- Extension runtime compatibility adjustments (for example in `background`)
- Injecting `injected` script content into the `content` template
- Cleaning intermediate files

Use `dist/` for local loading and release packaging.

## E2E

`e2e/` is an integration environment, not the main extension runtime code.

- Starts local site: `http://localhost:3000`
- Starts GraphQL mock: `http://localhost:9000`
- Works with `e2e/E2E.json` to validate key capabilities:
  - response code override
  - response header override
  - request header matching
  - delayed response
  - chunked response
  - variable capture and substitution

Recommended flow:

1. Run `npm run e2e`
2. Import `e2e/E2E.json` in the extension
3. Open `http://localhost:3000` and verify behavior

## Rule Capabilities

### Request matching

- Base matching by method and URL
- Optional request headers/body constraints
- Variable-based generic matching via RegExp

### Response override

- Custom status code and headers
- Text / JSON / file or binary body
- Delay and sequential chunk streaming

### Priority model

- Rules are matched by tree order (higher items have higher priority)
- Drag-and-drop to reorder priority
- Parent variables can be inherited or overridden by children

## Troubleshooting

### Request is not overridden

- Rule did not match (use Analyse to inspect diffs)
- Request fired before extension injection completed
- Strict CSP delayed or restricted injection
- Request is not `fetch/xhr` (for example static assets or websocket)

### Extension enabled but no visible effect

- Verify the domain is enabled
- Verify Domain/Folder/Request nodes are enabled
- Check if a higher-priority rule matched first

## Contribution

Before opening a PR, run:

```bash
npm test
npm run build
```

If request matching logic changes, run E2E regression scenarios as well.

## License

MIT
