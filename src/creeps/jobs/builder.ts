import globals from "core/globals";
import creepFailsafe from "../creepFailsafe";
import creepFarm from "../creepFarm";

export default function (creep: Creep) {
    creepFailsafe(creep);

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.working = false;
    }

    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(targets[0]);
        }
    } else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            creep.moveTo(sources[0]);
    }
}
