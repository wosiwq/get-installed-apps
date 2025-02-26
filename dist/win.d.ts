export interface AppInfo {
    appIdentifier: string;
    appName?: string;
    appVersion?: string;
    appInstallDate?: string;
    appPublisher?: string;
    [key: string]: any;
}
export declare function getInstalledApps(): Promise<AppInfo[]>;
export declare function isAppInstalled(name: string): Promise<boolean>;
//# sourceMappingURL=win.d.ts.map