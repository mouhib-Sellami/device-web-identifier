import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: true,
    target: "es2022",
    platform: "browser",
    tsconfig: "tsconfig.json",
    noExternal: ["ua-parser-js", "@fingerprintjs/fingerprintjs"]
});