import globals from "core/globals";

export default {
  run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      const source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES);

      if (!source) {
        creep.say(globals.MSG_ERR_SOURCE_NOT_FOUND);
      } else {
        creep.say(globals.MSG_HARVEST);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      const targets: any[] = creep.room.find(FIND_STRUCTURES, {
        filter: struct => {
          return struct.structureType === STRUCTURE_SPAWN || STRUCTURE_EXTENSION;
        },
      });

      for (const target of targets) {
        creep.say(globals.MSG_WORKING);
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },
};
