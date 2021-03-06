import globals from "../core/globals";
import uuid from "../core/uuid";

const bodyBase: BodyPartConstant[] = [WORK, CARRY, MOVE];

function composeBody(): BodyPartConstant[] {
  const energyCapacityAvailable = Game.rooms.W13N33.energyAvailable;
  const bodyNew = bodyBase;
  let pushCost = 0;
  for (const part of bodyBase) {
    pushCost += BODYPART_COST[part];
  }

  while (energyCapacityAvailable > pushCost) {
    for (const part of bodyBase) {
      pushCost += BODYPART_COST[part];
      if (energyCapacityAvailable <= pushCost) {
        return bodyNew;
      }
      bodyNew.push(part);
    }
  }
  if (!bodyNew.length) {
    // eslint-disable-next-line no-console
    console.error("Couldn't compose new body!");
  }

  return bodyNew;
}

export default function (): void {
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 5
  )
    Game.spawns.Spawn1.spawnCreep(composeBody(), `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER, working: false },
    });
  // Spawn new upgraders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_UPGRADER } })
      .size() < 3
  )
    Game.spawns.Spawn1.spawnCreep(composeBody(), `Upgrader_${uuid()}`, {
      memory: { role: globals.ROLE_UPGRADER, working: false },
    });
  // Spawn new builders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_BUILDER } })
      .size() < 10
  )
    Game.spawns.Spawn1.spawnCreep(composeBody(), `Builder_${uuid()}`, {
      memory: { role: globals.ROLE_BUILDER, working: false },
    });
}
