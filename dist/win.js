"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppInstalled = exports.getInstalledApps = void 0;
const registry_js_1 = require("registry-js");
// 需要查询的注册表路径配置
const REGISTRY_PATHS = [
    {
        hive: registry_js_1.HKEY.HKEY_LOCAL_MACHINE,
        key: "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    },
    {
        hive: registry_js_1.HKEY.HKEY_LOCAL_MACHINE,
        key: "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    },
    {
        hive: registry_js_1.HKEY.HKEY_CURRENT_USER,
        key: "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    },
    {
        hive: registry_js_1.HKEY.HKEY_CURRENT_USER,
        key: "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
    },
];
function getInstalledApps() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield Promise.all(REGISTRY_PATHS.map((path) => getApps(path.hive, path.key)));
            return results.flat().filter((app) => app.appName);
        }
        catch (error) {
            console.error("Error fetching installed apps:", error);
            return [];
        }
    });
}
exports.getInstalledApps = getInstalledApps;
function isAppInstalled(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const apps = yield getInstalledApps();
        return apps.some((app) => app.appName === name);
    });
}
exports.isAppInstalled = isAppInstalled;
function getApps(hive, keyPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subKeys = (0, registry_js_1.enumerateKeys)(hive, keyPath);
            const apps = yield Promise.all(subKeys.map((subKey) => getAppData(hive, `${keyPath}\\${subKey}`)));
            return apps.filter((app) => app.appName);
        }
        catch (error) {
            console.error(`Error reading registry path ${keyPath}:`, error);
            return [];
        }
    });
}
function getAppData(hive, keyPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = {
            appIdentifier: keyPath.split("\\").pop() || "",
        };
        try {
            const values = (0, registry_js_1.enumerateValues)(hive, keyPath);
            for (const value of values) {
                if (!value) {
                    continue;
                }
                switch (value.name) {
                    case "DisplayName":
                        app.appName = String(value.data);
                        break;
                    case "DisplayVersion":
                        app.appVersion = String(value.data);
                        break;
                    case "InstallDate":
                        app.appInstallDate = String(value.data);
                        break;
                    case "Publisher":
                        app.appPublisher = String(value.data);
                        break;
                }
                // 保留所有原始值
                app[value.name] = String(value.data);
            }
        }
        catch (error) {
            const values = (0, registry_js_1.enumerateValues)(hive, keyPath);
            console.error(`Error reading app data from ${keyPath}:`, error, `Values`, values);
        }
        return app;
    });
}
