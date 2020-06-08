"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../result");
var SourceFileMode;
(function (SourceFileMode) {
    SourceFileMode[SourceFileMode["File"] = 0] = "File";
    SourceFileMode[SourceFileMode["Modules"] = 1] = "Modules";
})(SourceFileMode = exports.SourceFileMode || (exports.SourceFileMode = {}));
var ParameterHint;
(function (ParameterHint) {
    ParameterHint[ParameterHint["File"] = 0] = "File";
    ParameterHint[ParameterHint["Directory"] = 1] = "Directory";
})(ParameterHint = exports.ParameterHint || (exports.ParameterHint = {}));
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["String"] = 0] = "String";
    ParameterType[ParameterType["Number"] = 1] = "Number";
    ParameterType[ParameterType["Boolean"] = 2] = "Boolean";
    ParameterType[ParameterType["Map"] = 3] = "Map";
    ParameterType[ParameterType["Mixed"] = 4] = "Mixed";
    ParameterType[ParameterType["Array"] = 5] = "Array";
})(ParameterType = exports.ParameterType || (exports.ParameterType = {}));
var ParameterScope;
(function (ParameterScope) {
    ParameterScope[ParameterScope["TypeDoc"] = 0] = "TypeDoc";
    ParameterScope[ParameterScope["TypeScript"] = 1] = "TypeScript";
})(ParameterScope = exports.ParameterScope || (exports.ParameterScope = {}));
function convert(value, option) {
    var _a;
    switch (option.type) {
        case undefined:
        case ParameterType.String:
            return result_1.Result.Ok(value == null ? '' : String(value));
        case ParameterType.Number:
            return result_1.Result.Ok(parseInt(String(value), 10) || 0);
        case ParameterType.Boolean:
            return result_1.Result.Ok(Boolean(value));
        case ParameterType.Array:
            if (Array.isArray(value)) {
                return result_1.Result.Ok(value.map(String));
            }
            else if (typeof value === 'string') {
                return result_1.Result.Ok(value.split(','));
            }
            return result_1.Result.Ok([]);
        case ParameterType.Map:
            const optionMap = option;
            const key = String(value).toLowerCase();
            if (optionMap.map instanceof Map) {
                if (optionMap.map.has(key)) {
                    return result_1.Result.Ok(optionMap.map.get(key));
                }
                if ([...optionMap.map.values()].includes(value)) {
                    return result_1.Result.Ok(value);
                }
            }
            else {
                if (optionMap.map.hasOwnProperty(key)) {
                    return result_1.Result.Ok(optionMap.map[key]);
                }
                if (Object.values(optionMap.map).includes(value)) {
                    return result_1.Result.Ok(value);
                }
            }
            return result_1.Result.Err((_a = optionMap.mapError, (_a !== null && _a !== void 0 ? _a : getMapError(optionMap.map, optionMap.name))));
        case ParameterType.Mixed:
            return result_1.Result.Ok(value);
    }
}
exports.convert = convert;
function getMapError(map, name) {
    let keys = map instanceof Map ? [...map.keys()] : Object.keys(map);
    const getString = (key) => String(map instanceof Map ? map.get(key) : map[key]);
    if (!(map instanceof Map) && keys.every(key => getString(getString(key)) === key)) {
        keys = keys.filter(key => Number.isNaN(parseInt(key, 10)));
    }
    return `${name} must be one of ${keys.join(', ')}`;
}
//# sourceMappingURL=declaration.js.map