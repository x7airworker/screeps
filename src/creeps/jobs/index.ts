import builderFun from "./builder";
import harvesterFun from "./harvester";
import upgraderFun from "./upgrader";

export namespace JobType {
    export const BUILDER: string = "BUILDER";
    export const HARVESTER: string = "HARVESTER";
    export const UPGRADER: string = "UPGRADER";
}

type Job = (creep: Creep) => void;

const JOB_FUNCTIONS: { [key: string]: Job } = {
    BUILDER: builderFun,
    HARVESTER: harvesterFun,
    UPGRADER: upgraderFun
};

export default JOB_FUNCTIONS;
