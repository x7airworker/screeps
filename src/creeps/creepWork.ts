import globals from "core/globals";
import roleBuilder from "./roleBuilder";
import roleHarvester from "./roleHarvester";
import roleUpgrader from "./roleUpgrader";

export default function (): void {
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    switch (creep.memory.role) {
      case globals.ROLE_HARVESTER:
        roleHarvester.run(creep);
        break;
      case globals.ROLE_UPGRADER:
        roleUpgrader.run(creep);
        break;
      case globals.ROLE_BUILDER:
        roleBuilder.run(creep);
        break;

      default:
        break;
    }
  }
}
