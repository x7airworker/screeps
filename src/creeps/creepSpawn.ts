import globals from "../core/globals";
import uuid from "../core/uuid";

let body: BodyPartConstant[];

if (Game.rooms.W13N33.energyCapacityAvailable >= 800) {
  body = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
} else {
  body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
}

export default function (): void {
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 5
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
