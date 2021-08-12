import { CreepState } from "creeps/creepState";

declare global {
    interface CreepMemory {
        job?: string;
        room?: string;
        working?: boolean;
        state: CreepState;
    }

    interface Memory {
        uuid: number;
        log: any;
    }
}


// `global` extension samples
declare namespace NodeJS {
    interface Global {
        log: any;
    }
}
