export default {
  run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      const sources: any[] = creep.room.find(FIND_SOURCES);

      for (const source of sources) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE)
          creep.moveTo(source, { visualizePathStyle: { stroke: "000000" } });
      }
    } else {
      const targets: any[] = creep.room.find(FIND_STRUCTURES, {
        filter: struct => {
          return struct.structureType === STRUCTURE_SPAWN;
        },
      });

      for (const target of targets) {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
          creep.moveTo(target, { visualizePathStyle: { stroke: "000000" } });
      }
    }
  },
};
