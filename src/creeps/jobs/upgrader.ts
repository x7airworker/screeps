import globals from "core/globals";
import creepFailsafe from "../creepFailsafe";

export default function (creep: Creep) {
    creepFailsafe(creep);
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
        creep.memory.working = true;
    }

    if (creep.room.controller) {
        creep.say(globals.MSG_WORKING);
        if (creep.memory.working) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: globals.COLOR_UPGRADER } });
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(sources[0]);
        }
    }
}
