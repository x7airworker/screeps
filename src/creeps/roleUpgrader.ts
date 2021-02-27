import globals from "core/globals";

export default {
  run(creep: Creep): void {
    let shouldUpgrade = false;

    if (shouldUpgrade && creep.store[RESOURCE_ENERGY] === 0) {
      shouldUpgrade = false;
    }
    if (!shouldUpgrade && creep.store.getFreeCapacity() === 0) {
      shouldUpgrade = true;
    }

    if (shouldUpgrade) {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#3333ff" } });
      }
    } else {
      const source: Source | null | undefined = creep.room.controller?.pos.findClosestByRange(FIND_SOURCES);

      if (source instanceof Source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#333333" } });
        }
      } else {
        creep.say(globals.MSG_ERR_SOURCE_NOT_FOUND);
      }
    }
  }
};
