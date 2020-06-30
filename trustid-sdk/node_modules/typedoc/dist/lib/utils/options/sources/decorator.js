"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const declared = [];
function addDecoratedOptions(options) {
    options.addDeclarations(declared);
}
exports.addDecoratedOptions = addDecoratedOptions;
function Option(option) {
    console.warn('The @Option decorator is deprecated and will be removed in v0.17.');
    console.warn(`  (Used to register ${option.name})`);
    declared.push(option);
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
exports.Option = Option;
//# sourceMappingURL=decorator.js.map