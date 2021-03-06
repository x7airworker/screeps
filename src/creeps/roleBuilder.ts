import globals from "core/globals";
import creepFailsafe from "./creepFailsafe";
import creepFarm from "./creepFarm";

export default {
  run(creep: Creep): void {
    creepFailsafe(creep);
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
    }

    if (!creep.memory.working) {
      creepFarm(creep, globals.COLOR_BUILDER);
    } else {
      const structure: ConstructionSite | null = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

      const repairables: AnyStructure[] | undefined = creep.room
        .find(FIND_STRUCTURES, {
          filter: c => c.hits < c.hitsMax,
        })
        .sort((a, b) => a.hits - b.hits);

      if (structure) {
        creep.say(globals.MSG_WORKING);
        if (creep.build(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure, { visualizePathStyle: { stroke: globals.COLOR_BUILDER } });
        }
      } else if (repairables.length) {
        creep.say(globals.MSG_WORKING);
        if (creep.repair(repairables[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(repairables[0], { visualizePathStyle: { stroke: globals.COLOR_BUILDER } });
        }
      }
    }
  },
};
