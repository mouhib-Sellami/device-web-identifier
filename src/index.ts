import { UAParser } from "ua-parser-js";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs";

export interface DeviceIdentification {
    finger_print: string;
    confidence: number;
    device_os: string;
    os_version: string;
    device_type: string;
    device_vendor: string;
    browser_name: string;
    browser_version: string;
    cpu_architecture: string;
    screen_resolution: string;
    language: string;
    time_zone: string;
    logical_processors: number | string;
}

export const getDeviceIdentification = async (): Promise<DeviceIdentification> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const parser = new UAParser();
    const uaResult = parser.getResult();

    return {
        finger_print: result.visitorId,
        confidence: result.confidence.score,
        device_os: uaResult.os.name ?? "Unknown OS",
        os_version: uaResult.os.version ?? "Unknown Version",
        device_type: uaResult.device.type ?? "desktop",
        device_vendor: uaResult.device.vendor ?? "Generic",
        browser_name: uaResult.browser.name ?? "Unknown Browser",
        browser_version: uaResult.browser.version ?? "Unknown Version",
        cpu_architecture: uaResult.cpu.architecture ?? "unknown",
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        logical_processors: navigator.hardwareConcurrency ?? "unknown",
    };
};