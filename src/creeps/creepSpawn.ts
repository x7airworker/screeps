import globals from "../core/globals";
import uuid from "../core/uuid";

const bodyBase: BodyPartConstant[] = [WORK, CARRY, MOVE];
let costBase = 0;
for (const part of bodyBase) {
  costBase += BODYPART_COST[part];
}

function composeBody(spawn: StructureSpawn): BodyPartConstant[] {
  const energyCapacityAvailable = spawn.room.energyAvailable;
  const bodyNew: BodyPartConstant[] = [];
  let pushCost = costBase;

  bodyBase.forEach(part => {
    bodyNew.push(part);
  });

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

export default function (spawn: StructureSpawn): void {
  // Spawn an emergency harvester if no creeps can be found
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    spawn.spawnCreep(bodyBase, `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER, working: false },
    });

    return;
  }
  // Check if energy capacity is high enough to spawn a base creep
  if (spawn.room.energyAvailable < costBase) {
    return;
  }
  if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_HARVESTER } })
      .size() < 3
  ) {
    spawn.spawnCreep(composeBody(spawn), `Harvester_${uuid()}`, {
      memory: { role: globals.ROLE_HARVESTER, working: false },
    });
  }
  // Spawn new upgraders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_UPGRADER } })
      .size() < 3
  ) {
    spawn.spawnCreep(composeBody(spawn), `Upgrader_${uuid()}`, {
      memory: { role: globals.ROLE_UPGRADER, working: false },
    });
  }
  // Spawn new builders
  else if (
    _(Game.creeps)
      .filter({ memory: { role: globals.ROLE_BUILDER } })
      .size() < 5 ||
    spawn.room.energyAvailable === spawn.room.energyCapacityAvailable
  ) {
    spawn.spawnCreep(composeBody(spawn), `Builder_${uuid()}`, {
      memory: { role: globals.ROLE_BUILDER, working: false },
    });
  }
}
