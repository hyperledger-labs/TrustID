import { Driver } from "./driver";
export interface HfConfig {
    stateStore: string;
    caURL: string;
    caName: string;
    caAdmin: string;
    caPassword: string;
    tlsOptions: any;
    mspId: string;
    walletID: string;
    asLocalhost: boolean;
    ccp: any;
}
export declare class HfDriver extends Driver {
    protected connection: any;
    constructor();
    callContractTransaction(id: string, fcn: string, args: any, channel?: string | undefined): Promise<any>;
    getContractTransaction(id: string, fcn: string, args: any, channel?: string | undefined): Promise<any>;
    connect(config: HfConfig): Promise<any>;
    disconnect(): Promise<void>;
}
