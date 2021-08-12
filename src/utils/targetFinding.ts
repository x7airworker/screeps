export namespace TargetFinding {
    export function findStorage(creep: Creep) {
        return creep.room.find<any>(FIND_STRUCTURES, {
            filter: (struct: StructureExtension) => {
                return (struct.structureType == STRUCTURE_EXTENSION ||
                    struct.structureType == STRUCTURE_SPAWN ||
                    struct.structureType == STRUCTURE_TOWER) &&
                    struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            },
        });
    }
    export function findPathToSpawner(creep: Creep) {
        let spawner;
        for (const [key, s] of Object.entries(Game.spawns)) {
            if (s.room === creep.room) {
                spawner = s;
                break;
            }
        }
        if (spawner)
            return creep.room.findPath(creep.pos, spawner.pos, {
                ignoreCreeps: true
            });
        return [];
    }
}
