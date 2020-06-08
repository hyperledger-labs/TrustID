import * as ts from 'typescript';
import { DeclarationOption, ParameterScope, TypeDocOptions, KeyToDeclaration, TypeDocAndTSOptions, TypeDocOptionMap } from './declaration';
import { Logger } from '../loggers';
import { Result } from '../result';
import { Application } from '../../..';
export interface OptionsReader {
    priority: number;
    name: string;
    read(container: Options, logger: Logger): void;
}
export declare class Options {
    private _readers;
    private _declarations;
    private _values;
    private _compilerOptions;
    private _logger;
    constructor(logger: Logger);
    setLogger(logger: Logger): void;
    addDefaultDeclarations(): void;
    reset(): void;
    addReader(reader: OptionsReader): void;
    removeReaderByName(name: string): void;
    read(logger: Logger): void;
    addDeclaration<K extends keyof TypeDocOptions>(declaration: {
        name: K;
    } & KeyToDeclaration<K>): void;
    addDeclaration(declaration: Readonly<DeclarationOption>): void;
    addDeclarations(declarations: readonly DeclarationOption[]): void;
    removeDeclarationByName(name: string): void;
    getDeclaration(name: string): Readonly<DeclarationOption> | undefined;
    getDeclarationsByScope(scope: ParameterScope): (Readonly<import("./declaration").StringDeclarationOption> | Readonly<import("./declaration").NumberDeclarationOption> | Readonly<import("./declaration").BooleanDeclarationOption> | Readonly<import("./declaration").MixedDeclarationOption> | Readonly<import("./declaration").MapDeclarationOption<unknown>> | Readonly<import("./declaration").ArrayDeclarationOption>)[];
    isDefault(name: keyof TypeDocAndTSOptions): boolean;
    isDefault(name: string): boolean;
    getRawValues(): Partial<TypeDocOptions>;
    getValue<K extends keyof TypeDocOptions>(name: K): TypeDocOptions[K];
    getValue(name: string): unknown;
    tryGetValue<K extends keyof TypeDocOptions>(name: K): Result<TypeDocOptions[K], Error>;
    tryGetValue(name: string): Result<unknown, Error>;
    getCompilerOptions(): ts.CompilerOptions;
    setValue<K extends keyof TypeDocAndTSOptions>(name: K, value: TypeDocAndTSOptions[K]): Result<void, Error>;
    setValue(name: string, value: unknown): Result<void, Error>;
    setValues(obj: Partial<TypeDocAndTSOptions>): Result<void, Error[]>;
}
export declare function BindOption<K extends keyof TypeDocOptionMap>(name: K): <IK extends PropertyKey>(target: ({
    application: Application;
} | {
    options: Options;
}) & {
    [K2 in IK]: TypeDocOptions[K];
}, key: IK) => void;
export declare function BindOption(name: string): (target: {
    application: Application;
} | {
    options: Options;
}, key: PropertyKey) => void;
