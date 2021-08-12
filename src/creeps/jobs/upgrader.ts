import globals from "core/globals";
import creepFailsafe from "../creepFailsafe";
import creepFarm from "../creepFarm";

export default function (creep: Creep) {
    creepFailsafe(creep);
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.working = false;
    }

    if (creep.room.controller) {
        creep.say(globals.MSG_WORKING);
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: globals.COLOR_UPGRADER } });
        } else {
            creep.memory.working = true;
        }
    }
}
