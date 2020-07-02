"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const ts = require("typescript");
const typescript_1 = require("../sources/typescript");
function isFile(file) {
    return fs_1.existsSync(file) && fs_1.statSync(file).isFile();
}
class TSConfigReader {
    constructor() {
        this.priority = 200;
        this.name = 'tsconfig-json';
    }
    read(container, logger) {
        const tsconfigOpt = container.getValue('tsconfig');
        const projectOpt = container.getCompilerOptions().project;
        if (!container.isDefault('tsconfig')) {
            this._tryReadOptions(tsconfigOpt, container, logger);
            return;
        }
        if (projectOpt) {
            this._tryReadOptions(projectOpt, container, logger);
            return;
        }
        this._tryReadOptions(tsconfigOpt, container);
    }
    _tryReadOptions(file, container, logger) {
        var _a, _b;
        let fileToRead = file;
        if (!isFile(fileToRead)) {
            fileToRead = ts.findConfigFile(file, isFile, file.toLowerCase().endsWith('.json') ? path_1.basename(file) : undefined);
        }
        if (!fileToRead || !isFile(fileToRead)) {
            (_a = logger) === null || _a === void 0 ? void 0 : _a.error(`The tsconfig file ${file} does not exist`);
            return;
        }
        fileToRead = path_1.resolve(fileToRead);
        const { config } = ts.readConfigFile(fileToRead, ts.sys.readFile);
        const { fileNames, options, raw: { typedocOptions = {} } } = ts.parseJsonConfigFileContent(config, ts.sys, path_1.dirname(fileToRead), {}, fileToRead);
        container.setValue('inputFiles', fileNames).unwrap();
        for (const key of typescript_1.IGNORED) {
            delete options[key];
        }
        if (typedocOptions.options) {
            (_b = logger) === null || _b === void 0 ? void 0 : _b.error([
                'typedocOptions in tsconfig file specifies an option file to read but the option',
                'file has already been read. This is likely a misconfiguration.'
            ].join(' '));
            delete typedocOptions.options;
        }
        container.setValues(options).mapErr(errors => {
            var _a;
            for (const err of errors) {
                (_a = logger) === null || _a === void 0 ? void 0 : _a.error(err.message);
            }
        });
        container.setValues(typedocOptions || {}).mapErr(errors => {
            var _a;
            for (const err of errors) {
                (_a = logger) === null || _a === void 0 ? void 0 : _a.error(err.message);
            }
        });
    }
}
exports.TSConfigReader = TSConfigReader;
//# sourceMappingURL=tsconfig.js.map