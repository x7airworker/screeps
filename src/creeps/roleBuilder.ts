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
      const structure: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

      if (structure) {
        if (creep.build(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure, { visualizePathStyle: { stroke: "#fe4151" } });
        }
      }
    } else {
      const source: Source | null | undefined = creep.pos.findClosestByRange(FIND_SOURCES);

      if (source instanceof Source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.say(globals.MSG_HARVEST);
          creep.moveTo(source, { visualizePathStyle: { stroke: "#fe4151" } });
        }
      } else {
        creep.say(globals.MSG_ERR_SOURCE_NOT_FOUND);
      }
    }
  },
};
