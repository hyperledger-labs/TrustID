import { DeclarationOption } from '../declaration';
import { Options } from '..';
import { Application } from '../../../application';
export declare function addDecoratedOptions(options: Options): void;
export declare function Option(option: DeclarationOption): (target: {
    application: Application;
} | {
    options: Options;
}, key: string | number | symbol) => void;
