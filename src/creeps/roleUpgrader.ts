import globals from "core/globals";
import creepFarm from "./creepFarm";

export default {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
    }

    if (!creep.memory.working) {
      creepFarm(creep, globals.COLOR_UPGRADER);
    } else {
      if (creep.room.controller) {
        creep.say(globals.MSG_WORKING);
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: globals.COLOR_UPGRADER } });
        }
      }
    }
  },
};
