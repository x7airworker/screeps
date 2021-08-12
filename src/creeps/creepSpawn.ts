import uuid from "../core/uuid";
import { CreepState } from "./creepState";
import { JobType } from "./jobs";

const BASE_MEMORY: CreepMemory = {
    state: CreepState.IDLE,
    working: false
};

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

function spawnHarvester(spawn: StructureSpawn) {
    spawn.spawnCreep(bodyBase, `Harvester_${uuid()}`, {
        memory: {
            job: JobType.HARVESTER,
            ...BASE_MEMORY
        },
    });
}

function spawnUpgrader(spawn: StructureSpawn) {
    spawn.spawnCreep(composeBody(spawn), `Upgrader_${uuid()}`, {
        memory: {
            job: JobType.UPGRADER,
            ...BASE_MEMORY
        },
    });
}

function spawnBuilder(spawn: StructureSpawn) {
    spawn.spawnCreep(composeBody(spawn), `Builder_${uuid()}`, {
        memory: {
            job: JobType.BUILDER,
            ...BASE_MEMORY
        },
    });
}

export default function (spawn: StructureSpawn): void {
    // Spawn an emergency harvester if no creeps can be found
    if (!spawn.room.find(FIND_MY_CREEPS).length) {
        spawnHarvester(spawn);
        return;
    }
    // Check if energy capacity is high enough to spawn a base creep
    if (spawn.room.energyAvailable < costBase) {
        return;
    }

    if (
        _(Game.creeps)
            .filter({ memory: { job: JobType.HARVESTER } })
            .size() < 3
    ) spawnHarvester(spawn);
    // Spawn new upgraders
    else if (
        _(Game.creeps)
            .filter({ memory: { job: JobType.UPGRADER } })
            .size() < 3
    ) spawnUpgrader(spawn);
    // Spawn new builders
    else if (
        _(Game.creeps)
            .filter({ memory: { job: JobType.BUILDER } })
            .size() < 5 ||
        spawn.room.energyAvailable === spawn.room.energyCapacityAvailable
    ) spawnBuilder(spawn);
}
