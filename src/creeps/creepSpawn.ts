import globals from "../core/globals";
import uuid from "../core/uuid";

const body: BodyPartConstant[] = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

export default function (): void {
  // Spawn new harvesters
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 3
  )
    Game.spawns.Spawn1.spawnCreep(body, `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER, working: false },
    });
  // Spawn new upgraders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_UPGRADER } })
      .size() < 3
  )
    Game.spawns.Spawn1.spawnCreep(body, `Upgrader_${uuid()}`, {
      memory: { role: globals.ROLE_UPGRADER, working: false },
    });
  // Spawn new builders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_BUILDER } })
      .size() < 10
  )
    Game.spawns.Spawn1.spawnCreep(body, `Builder_${uuid()}`, {
      memory: { role: globals.ROLE_BUILDER, working: false },
    });
}
