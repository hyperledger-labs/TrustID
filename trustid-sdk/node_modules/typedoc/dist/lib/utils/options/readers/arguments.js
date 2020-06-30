"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const declaration_1 = require("../declaration");
class ArgumentsReader {
    constructor(priority, args = process.argv.slice(2)) {
        this.name = 'arguments';
        this.priority = priority;
        this.args = args;
    }
    read(container, logger) {
        const seen = new Set();
        let index = 0;
        while (index < this.args.length) {
            const name = this.args[index];
            const decl = name.startsWith('-')
                ? (index++, container.getDeclaration(name.replace(/^--?/, '')))
                : container.getDeclaration('inputFiles');
            if (decl) {
                if (seen.has(decl.name) && decl.type === declaration_1.ParameterType.Array) {
                    container.setValue(decl.name, container.getValue(decl.name).concat(this.args[index]));
                }
                else if (decl.type === declaration_1.ParameterType.Boolean) {
                    const value = String(this.args[index]).toLowerCase();
                    if (value === 'true' || value === 'false') {
                        container.setValue(decl.name, value === 'true');
                    }
                    else {
                        container.setValue(decl.name, true);
                        index--;
                    }
                }
                else {
                    container.setValue(decl.name, this.args[index]);
                }
                seen.add(decl.name);
            }
            else {
                logger.error(`Unknown option: ${name}`);
            }
            index++;
        }
    }
}
exports.ArgumentsReader = ArgumentsReader;
//# sourceMappingURL=arguments.js.map