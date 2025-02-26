/**
 * Creates a registry object, which provides access to a single registry key.
 * Note: This class is returned by a call to ```require('winreg')```.
 *
 * @public
 * @class
 *
 * @param {object} options - the options
 * @param {string=} options.host - the hostname
 * @param {string=} options.hive - the hive id
 * @param {string=} options.key - the registry key
 * @param {string=} options.arch - the optional registry hive architecture ('x86' or 'x64'; only valid on Windows 64 Bit Operating Systems)
 *
 * @example
 * let Registry = require('winreg')
 * ,   autoStartCurrentUser = new Registry({
 *       hive: Registry.HKCU,
 *       key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
 *     });
 *
 */
export declare function Registry(options: any): void;
export declare namespace Registry {
    var HKLM: string;
    var HKCU: string;
    var HKCR: string;
    var HKU: string;
    var HKCC: string;
    var HIVES: string[];
    var REG_SZ: string;
    var REG_MULTI_SZ: string;
    var REG_EXPAND_SZ: string;
    var REG_DWORD: string;
    var REG_QWORD: string;
    var REG_BINARY: string;
    var REG_NONE: string;
    var REG_TYPES: string[];
    var DEFAULT_VALUE: string;
}
//# sourceMappingURL=registry.d.ts.map