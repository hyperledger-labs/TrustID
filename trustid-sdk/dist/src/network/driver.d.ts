export declare abstract class Driver {
    protected connection: any;
    constructor();
    abstract connect(config: object): any;
    abstract disconnect(config: object): void;
    abstract callContractTransaction(id: string, fcn: string, args: any, channel?: string): any;
    abstract getContractTransaction(id: string, fcn: string, args: any, channel?: string): any;
    /** Return connection */
    getConnection(): any;
}
