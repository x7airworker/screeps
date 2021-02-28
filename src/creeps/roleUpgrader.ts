import globals from "core/globals";

export default {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      if (creep.room.controller) {
        creep.say(globals.MSG_WORKING);
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#0f111a" } });
        }
      }
    } else {
      const source: Source | null | undefined = creep.room.controller?.pos.findClosestByRange(FIND_SOURCES);

      if (source instanceof Source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.say(globals.MSG_HARVEST);
          creep.moveTo(source, { visualizePathStyle: { stroke: "#0f111a" } });
        }
      } else {
        creep.say(globals.MSG_ERR_SOURCE_NOT_FOUND);
      }
    }
  },
};
