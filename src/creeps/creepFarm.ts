import globals from "core/globals";

export default function (creep: Creep, color: string): void {
  const droplets: Resource<ResourceConstant>[] | undefined = creep.room.find(FIND_DROPPED_RESOURCES, {
    filter: d => d.resourceType === RESOURCE_ENERGY,
  });

  const tombstones: Tombstone[] | undefined = creep.room.find(FIND_TOMBSTONES, {
    filter: t => t.creep.store.getCapacity(RESOURCE_ENERGY) > 0,
  });

  const source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: s => s.energy > creep.store.getFreeCapacity(),
  });

  if (tombstones.length) {
    creep.say(globals.MSG_HARVEST);
    if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(tombstones[0]);
    }
  }

  if (droplets.length) {
    creep.say(globals.MSG_HARVEST);
    if (creep.pickup(droplets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(droplets[0]);
    }
  }

  if (!source) {
    creep.say(globals.MSG_ERR_NOT_FOUND);
  } else {
    creep.say(globals.MSG_HARVEST);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: color } });
    }
  }
}
