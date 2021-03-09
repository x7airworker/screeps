import creepSpawn from "creeps/creepSpawn";
import creepWork from "creeps/creepWork";

export default function (): void {
  // Loop over all own spawns and check if they're spawning something allready
  for (const spawn in Game.spawns) {
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
  }

  // Let the creeps work
  creepWork();
}
