import ts from 'typescript';
export declare function collectIgnoreMap(sourceFile: ts.SourceFile, file: string): {
    [file: string]: Set<number>;
};
