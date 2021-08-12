import { createRequire } from "module";
import creepFailsafe from "../creepFailsafe";

function requestNewConstruction(creep: Creep) {
    // current position should be near resource so we can use this
    let spawner;
    for (const [key, s] of Object.entries(Game.spawns)) {
        if (s.room === creep.room) {
            spawner = s;
            break;
        }
    }
    if (!creep.room.storage) {
        const pos = creep.room.controller?.pos;
        if (pos && spawner) {
            // calculate the middle between controller and spawner so we can setup storage
            const x = Math.abs(pos.x - spawner.pos.x);
            const y = Math.abs(pos.y - spawner.pos.y);
            const result = creep.room.createConstructionSite(x, y, STRUCTURE_STORAGE);
            creep.say(result + "");
        }
    }
}

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
        } else {
            requestNewConstruction(creep);
        }
    } else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            creep.moveTo(sources[0]);
    }
}
