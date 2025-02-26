import { exec, spawnSync } from "child_process";
export function getInstalledApps(directory) {
    return new Promise(async (resolve, reject) => {
        try {
            const directoryContents = await getDirectoryContents(directory);
            const appsFileInfo = await getAppsFileInfo(directoryContents);
            resolve(appsFileInfo
                .map((appFileInfo) => getAppData(appFileInfo))
                .filter((app) => app.appName));
        }
        catch (error) {
            reject(error);
        }
    });
}
/**
 * getDirectoryContents
 * @param directory
 * @returns A Promise with directory contents
 */
export function getDirectoryContents(directory) {
    return new Promise((resolve, reject) => {
        exec(`ls ${directory}`, (error, stdout) => {
            if (error) {
                reject(error);
            }
            else {
                try {
                    resolve(getAppsSubDirectory(stdout, directory));
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    });
}
/**
 * getAppSubDirectorys
 * @param stdout
 * @param directory
 * @returns Apps sub directorys
 */
export function getAppsSubDirectory(stdout, directory) {
    let stdoutArr = stdout.split(/[(\r\n)\r\n]+/);
    stdoutArr = stdoutArr
        .filter((o) => o)
        .map((i) => {
        return `${directory}/${i}`;
    });
    return stdoutArr;
}
/**
 * getAppsFileInfo
 * @param appsFile
 * @returns All apps fileInfo data
 */
export function getAppsFileInfo(appsFile) {
    const runMdlsShell = spawnSync("mdls", appsFile, {
        encoding: "utf8",
    });
    const stdoutData = runMdlsShell.stdout;
    const allAppsFileInfoList = [];
    const stdoutDataArr = stdoutData.split(/[(\r\n)\r\n]+/);
    const splitIndexArr = [];
    for (let i = 0; i < stdoutDataArr.length; i++) {
        if (stdoutDataArr[i].includes("_kMDItemDisplayNameWithExtensions")) {
            splitIndexArr.push(i);
        }
    }
    for (let j = 0; j < splitIndexArr.length; j++) {
        allAppsFileInfoList.push(stdoutDataArr.slice(splitIndexArr[j], splitIndexArr[j + 1]));
    }
    return allAppsFileInfoList;
}
/**
 * getAppData
 * @param singleAppFileInfo
 * @returns One app data
 */
export function getAppData(singleAppFileInfo) {
    const getKeyVal = (lineData) => {
        const lineDataArr = lineData.split("=");
        return {
            key: lineDataArr[0].trim().replace(/\"/g, ""),
            value: lineDataArr[1] ? lineDataArr[1].trim().replace(/\"/g, "") : "",
        };
    };
    const getAppInfoData = (appArr) => {
        let appData = {};
        appArr
            .filter((i) => i)
            .forEach((o) => {
            let appKeyVal = getKeyVal(o);
            if (appKeyVal.value) {
                appData[appKeyVal.key] = appKeyVal.value;
            }
            if (o.includes("kMDItemDisplayName")) {
                appData.appName = appKeyVal.value;
            }
            if (o.includes("kMDItemVersion")) {
                appData.appVersion = appKeyVal.value;
            }
            if (o.includes("kMDItemDateAdded")) {
                appData.appInstallDate = appKeyVal.value;
            }
            if (o.includes("kMDItemCFBundleIdentifier")) {
                appData.appIdentifier = appKeyVal.value;
            }
        });
        return appData;
    };
    return getAppInfoData(singleAppFileInfo);
}
