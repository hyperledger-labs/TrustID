"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const declaration_1 = require("./declaration");
const result_1 = require("../result");
const array_1 = require("../array");
const sources_1 = require("./sources");
class Options {
    constructor(logger) {
        this._readers = [];
        this._declarations = new Map();
        this._values = {};
        this._compilerOptions = {};
        this._logger = logger;
    }
    setLogger(logger) {
        this._logger = logger;
    }
    addDefaultDeclarations() {
        sources_1.addTSOptions(this);
        sources_1.addTypeDocOptions(this);
    }
    reset() {
        for (const declaration of this._declarations.values()) {
            if (declaration.scope !== declaration_1.ParameterScope.TypeScript) {
                this._values[declaration.name] = declaration_1.convert(declaration.defaultValue, declaration)
                    .expect(`Failed to validate default value for ${declaration.name}`);
            }
        }
        this._compilerOptions = {};
    }
    addReader(reader) {
        array_1.insertPrioritySorted(this._readers, reader);
    }
    removeReaderByName(name) {
        this._readers = this._readers.filter(reader => reader.name !== name);
    }
    read(logger) {
        for (const reader of this._readers) {
            reader.read(this, logger);
        }
    }
    addDeclaration(declaration) {
        const names = [declaration.name];
        if (declaration.short) {
            names.push(declaration.short);
        }
        for (const name of names) {
            const decl = this.getDeclaration(name);
            if (decl && decl !== declaration) {
                this._logger.error(`The option ${name} has already been registered`);
            }
            else {
                this._declarations.set(name.toLowerCase(), declaration);
            }
        }
        if (declaration.scope !== declaration_1.ParameterScope.TypeScript) {
            this._values[declaration.name] = declaration_1.convert(declaration.defaultValue, declaration)
                .expect(`Failed to validate default value for ${declaration.name}`);
        }
    }
    addDeclarations(declarations) {
        for (const decl of declarations) {
            this.addDeclaration(decl);
        }
    }
    removeDeclarationByName(name) {
        const declaration = this.getDeclaration(name);
        if (declaration) {
            this._declarations.delete(declaration.name.toLowerCase());
            if (declaration.short) {
                this._declarations.delete(declaration.short.toLowerCase());
            }
            delete this._values[declaration.name];
        }
    }
    getDeclaration(name) {
        return this._declarations.get(name.toLowerCase());
    }
    getDeclarationsByScope(scope) {
        return _.uniq(Array.from(this._declarations.values()))
            .filter(declaration => { var _a; return (_a = declaration.scope, (_a !== null && _a !== void 0 ? _a : declaration_1.ParameterScope.TypeDoc)) === scope; });
    }
    isDefault(name) {
        return this.getValue(name) === this.getDeclaration(name).defaultValue;
    }
    getRawValues() {
        return _.cloneDeep(this._values);
    }
    getValue(name) {
        return this.tryGetValue(name).match({
            ok: v => v,
            err(err) { throw err; }
        });
    }
    tryGetValue(name) {
        const declaration = this.getDeclaration(name);
        if (!declaration) {
            return result_1.Err(new Error(`Unknown option '${name}'`));
        }
        if (declaration.scope === declaration_1.ParameterScope.TypeScript) {
            return result_1.Err(new Error('TypeScript options must be fetched with getCompilerOptions.'));
        }
        return result_1.Ok(this._values[declaration.name]);
    }
    getCompilerOptions() {
        return _.cloneDeep(this._compilerOptions);
    }
    setValue(name, value) {
        const declaration = this.getDeclaration(name);
        if (!declaration) {
            return result_1.Err(Error(`Tried to set an option (${name}) that was not declared.`));
        }
        return declaration_1.convert(value, declaration).match({
            ok: value => {
                const bag = declaration.scope === declaration_1.ParameterScope.TypeScript
                    ? this._compilerOptions
                    : this._values;
                bag[declaration.name] = value;
                return result_1.Ok(void 0);
            },
            err: err => result_1.Err(Error(err))
        });
    }
    setValues(obj) {
        const errors = [];
        for (const [name, value] of Object.entries(obj)) {
            this.setValue(name, value).match({
                ok() { },
                err(error) {
                    errors.push(error);
                }
            });
        }
        return errors.length ? result_1.Err(errors) : result_1.Ok(void 0);
    }
}
exports.Options = Options;
function BindOption(name) {
    return function (target, key) {
        Object.defineProperty(target, key, {
            get() {
                if ('options' in this) {
                    return this.options.getValue(name);
                }
                else {
                    return this.application.options.getValue(name);
                }
            },
            enumerable: true,
            configurable: true
        });
    };
}
exports.BindOption = BindOption;
//# sourceMappingURL=options.js.map