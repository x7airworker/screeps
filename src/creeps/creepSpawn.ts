import globals from "../core/globals";
import uuid from "../core/uuid";

const bodyBase: BodyPartConstant[] = [WORK, CARRY, MOVE];
let costBase = 0;
for (const part of bodyBase) {
  costBase += BODYPART_COST[part];
}

function composeBody(): BodyPartConstant[] {
  const energyCapacityAvailable = Game.rooms.W13N33.energyAvailable;
  const bodyNew = bodyBase;
  let pushCost = costBase;
  for (const part of bodyBase) {
    pushCost += BODYPART_COST[part];
  }

  console.log("-------------------------------\nInitial values:\n-------------------------------");
  console.log(`Base body: ${bodyBase.toString()}`);
  console.log(`Push cost: ${pushCost}`);
  console.log(`New body: ${bodyNew.toString()}`);

  while (energyCapacityAvailable > pushCost) {
    for (const part of bodyBase) {
      pushCost += BODYPART_COST[part];
      if (energyCapacityAvailable <= pushCost) {
        console.log(
          `Early return due to push costs being too high to maintan pushing new body parts\nNew body: ${bodyNew.toString()}`,
        );
        return bodyNew;
      }
      bodyNew.push(part);
    }
  }
  if (!bodyNew.length) {
    // eslint-disable-next-line no-console
    console.error("Couldn't compose new body!");
  }

  console.log(`New body is being returned with the following values: ${bodyNew.toString()}`);

  return bodyNew;
}

export default function (spawn: StructureSpawn): void {
  // Check if energy capacity is high enough to spawn a base creep
  if (spawn.room.energyAvailable < costBase) {
    return;
  }
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
