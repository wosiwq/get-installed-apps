import { getInstalledApps as macGetInstalledApps } from "./mac.js";
import type { AppInfo } from "./win.js";
import { getInstalledApps as winGetInstalledApps } from "./win.js";

export function getInstalledApps() {
  if (process.platform === "darwin") {
    return macGetInstalledApps("/Applications");
  } else if (process.platform === "win32") {
    return winGetInstalledApps();
  } else {
    return new Promise((_resolve, reject) => {
      reject("Platform not supported");
    });
  }
}

export function getMacInstalledApps(directory = "/Applications") {
  return macGetInstalledApps(directory);
}

export function getWinInstalledApps(): Promise<AppInfo[]> {
  return winGetInstalledApps();
}
