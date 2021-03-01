import globals from "core/globals";

export default function (creep: Creep, color: string): void {
  const source: Source | null = creep.pos.findClosestByPath(FIND_SOURCES);

  if (!source) {
    creep.say(globals.MSG_ERR_NOT_FOUND);
  } else {
    creep.say(globals.MSG_HARVEST);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: color } });
    }
  }
}
