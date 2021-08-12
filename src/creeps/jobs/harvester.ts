import globals from "core/globals";
import { TargetFinding } from "utils/targetFinding";
import creepFailsafe from "../creepFailsafe";
import creepFarm from "../creepFarm";

export default function (creep: Creep) {
    creepFailsafe(creep);
    if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
        const targets: any[] = TargetFinding.findStorage(creep);

        if (targets.length > 0) {
            creep.say(globals.MSG_WORKING);
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: globals.COLOR_HARVESTER } });
            } else {
                creep.memory.working = false;
            }
        }
    } else {
        creepFarm(creep, globals.COLOR_HARVESTER);
        creep.memory.working = true;
    }
};
