export declare function getInstalledApps(directory: string): Promise<unknown>;
/**
 * getDirectoryContents
 * @param directory
 * @returns A Promise with directory contents
 */
export declare function getDirectoryContents(directory: string): Promise<Array<string>>;
/**
 * getAppSubDirectorys
 * @param stdout
 * @param directory
 * @returns Apps sub directorys
 */
export declare function getAppsSubDirectory(stdout: string, directory: string): Array<string>;
/**
 * getAppsFileInfo
 * @param appsFile
 * @returns All apps fileInfo data
 */
export declare function getAppsFileInfo(appsFile: readonly string[]): Array<any>;
/**
 * getAppData
 * @param singleAppFileInfo
 * @returns One app data
 */
export declare function getAppData(singleAppFileInfo: Array<any>): any;
//# sourceMappingURL=mac.d.ts.map