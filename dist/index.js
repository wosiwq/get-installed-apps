"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinInstalledApps = exports.getMacInstalledApps = exports.getInstalledApps = void 0;
const mac_js_1 = require("./mac.js");
const win_js_1 = require("./win.js");
function getInstalledApps() {
    if (process.platform === "darwin") {
        return (0, mac_js_1.getInstalledApps)("/Applications");
    }
    else if (process.platform === "win32") {
        return (0, win_js_1.getInstalledApps)();
    }
    else {
        return new Promise((_resolve, reject) => {
            reject("Platform not supported");
        });
    }
}
exports.getInstalledApps = getInstalledApps;
function getMacInstalledApps(directory = "/Applications") {
    return (0, mac_js_1.getInstalledApps)(directory);
}
exports.getMacInstalledApps = getMacInstalledApps;
function getWinInstalledApps() {
    return (0, win_js_1.getInstalledApps)();
}
exports.getWinInstalledApps = getWinInstalledApps;
