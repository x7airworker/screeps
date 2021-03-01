import globals from "core/globals";

export default {
  run(creep: Creep): void {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
    }

    if (!creep.memory.working) {
      const source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES);

      if (!source) {
        creep.say(globals.MSG_ERR_NOT_FOUND);
      } else {
        creep.say(globals.MSG_HARVEST);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    } else {
      const targets: any[] | undefined = creep.room.find<any>(FIND_STRUCTURES, {
        filter: struct => {
          const struct2 = struct as any;
          if (struct2.store) {
            if (struct2.store.getFreeCapacity([RESOURCE_ENERGY]) > 0) {
              return struct2;
            } else {
              return;
            }
          } else {
            return;
          }
        },
      });

      if (targets.length) {
        creep.say(globals.MSG_WORKING);
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
  },
};
