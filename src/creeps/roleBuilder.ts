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

      let repairables: AnyStructure[] | undefined = creep.room.find(FIND_STRUCTURES, {
        filter: c => c.hits < c.hitsMax && c.hitsMax - c.hits < creep.store.getCapacity() * 2,
      });

      if (!repairables.length) {
        repairables = creep.room.find(FIND_STRUCTURES, { filter: c => c.hits < c.hitsMax });
      }

      repairables.sort((a, b) => a.hits - b.hits);

      if (structure) {
        creep.say(globals.MSG_WORKING);
        if (creep.build(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure, { visualizePathStyle: { stroke: "#fe4151" } });
        }
      } else if (repairables.length) {
        creep.say(globals.MSG_WORKING);
        if (creep.repair(repairables[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(repairables[0], { visualizePathStyle: { stroke: "#0f111a" } });
        }
      }
    } else {
      const source: Source | null | undefined = creep.pos.findClosestByRange(FIND_SOURCES);

      if (source instanceof Source) {
        creep.say(globals.MSG_HARVEST);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#fe4151" } });
        }
      } else {
        creep.say(globals.MSG_ERR_NOT_FOUND);
      }
    }
  },
};
