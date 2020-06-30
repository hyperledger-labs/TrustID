import { SourceFileInfo } from './interfaces';
export declare function collectDependencies(sourceFileInfos: SourceFileInfo[], allFiles: Set<string>): [string, string][];
export declare function clearCacheOfDependencies(sourceFileInfo: SourceFileInfo, dependencies: [string, string][], sourceFileInfos: SourceFileInfo[]): void;
