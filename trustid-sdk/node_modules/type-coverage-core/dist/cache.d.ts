import { TypeCheckResult } from './interfaces';
export declare function getFileHash(file: string, enableCache: boolean): Promise<string>;
export declare function saveCache(typeCheckResult: TypeCheckResult): Promise<void>;
export declare function readCache(enableCache: boolean): Promise<TypeCheckResult>;
