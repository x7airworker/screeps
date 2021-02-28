import globals from "../core/globals";
import uuid from "../core/uuid";

export default function (): void {
  // Spawn new harvesters
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 2
  )
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, CARRY, MOVE], `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER },
    });

  // Spawn new upgraders
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_UPGRADER } })
      .size() < 5
  )
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], `Upgrader_${uuid()}`, {
      memory: { role: globals.ROLE_UPGRADER, working: false },
    });

  // Spawn new builders
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_BUILDER } })
      .size() < 5
  )
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], `Builder_${uuid()}`, {
      memory: { role: globals.ROLE_BUILDER, working: false },
    });
}
