# device-web-identifier

A lightweight browser utility for device fingerprinting and identification. Collects browser, OS, hardware, and network metadata using [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) and [ua-parser-js](https://github.com/faisalman/ua-parser-js).

---

## Features

- Unique visitor fingerprint via FingerprintJS
- OS name and version detection
- Browser name and version detection
- Device type, vendor detection
- CPU architecture detection
- Screen resolution, language, and timezone
- Logical processor count
- Dual ESM/CJS output — works with Vite, Webpack, Rollup, and plain `<script type="module">`

---

## Installation

```bash
npm install device-web-identifier
```

---

## Usage

### ES Module (Vite, modern bundlers)

```typescript
import { getDeviceIdentification } from "device-web-identifier";

const info = await getDeviceIdentification();
console.log(info);
```

### Plain HTML (no bundler)

```html
<script type="module">
  import { getDeviceIdentification } from "./node_modules/device-web-identifier/dist/index.mjs";

  const info = await getDeviceIdentification();
  console.log(info);
</script>
```

### CommonJS (Node-compatible bundlers)

```javascript
const { getDeviceIdentification } = require("device-web-identifier");
```

> **Note:** This is a browser-only package. It relies on `window`, `navigator`, and `screen` APIs. Do not use it in a Node.js server environment.

---

## Return Value

`getDeviceIdentification()` returns a `Promise<DeviceIdentification>`:

```typescript
interface DeviceIdentification {
  finger_print: string;       // Unique visitor ID (FingerprintJS)
  confidence: number;         // Fingerprint confidence score (0–1)
  device_os: string;          // e.g. "Windows", "macOS", "Android"
  os_version: string;         // e.g. "10", "14.0"
  device_type: string;        // "mobile" | "tablet" | "desktop"
  device_vendor: string;      // e.g. "Apple", "Samsung", "Generic"
  browser_name: string;       // e.g. "Chrome", "Firefox", "Safari"
  browser_version: string;    // e.g. "124.0.0"
  cpu_architecture: string;   // e.g. "amd64", "arm"
  screen_resolution: string;  // e.g. "1920x1080"
  language: string;           // e.g. "en-US"
  time_zone: string;          // e.g. "Africa/Tunis"
  logical_processors: number | string; // e.g. 8
}
```

### Example output

```json
{
  "finger_print": "a1b2c3d4e5f6...",
  "confidence": 0.995,
  "device_os": "Windows",
  "os_version": "10",
  "device_type": "desktop",
  "device_vendor": "Generic",
  "browser_name": "Chrome",
  "browser_version": "124.0.6367.60",
  "cpu_architecture": "amd64",
  "screen_resolution": "1920x1080",
  "language": "en-US",
  "time_zone": "Africa/Tunis",
  "logical_processors": 8
}
```

---

## API

### `getDeviceIdentification(): Promise<DeviceIdentification>`

Asynchronously collects and returns device metadata. Must be called in a browser context.

---

## Build

```bash
npm install
npm run build
```

Output in `dist/`:

| File | Format | Purpose |
|---|---|---|
| `index.mjs` | ESM | Modern bundlers, `<script type="module">` |
| `index.js` | CJS | CommonJS / older bundlers |
| `index.d.ts` | Types | TypeScript consumers |

---

## Requirements

- Browser environment (Chrome, Firefox, Safari, Edge)
- No server-side rendering support

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@fingerprintjs/fingerprintjs` | ^5.2.0 | Visitor fingerprinting |
| `ua-parser-js` | ^2.0.10 | User-agent parsing |

---

## License

MIT © [Mouhib Sellami](https://github.com/mouhib-Sellami)