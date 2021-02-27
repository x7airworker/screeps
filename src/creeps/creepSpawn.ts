import globals from "../core/globals";
import uuid from "../core/uuid";

export default function (): void {
  // Spawn new harvesters only when there are less than x
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 2
  )
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER },
    });

  // Spawn new upgrades only when there are less than x
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_UPGRADER } })
      .size() < 3
  )
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], `Upgrader_${uuid()}`, {
      memory: { role: globals.ROLE_UPGRADER },
    });
}
