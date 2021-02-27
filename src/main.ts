import gameLoop from "core/gameLoop";
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Count out base cpu usage
  const cpuStart: number = Game.cpu.getUsed();

  // Some information logging
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  // Run the default game loop
  gameLoop();

  // Logs used CPU time, goes to the end
  console.log(`CPU used: ${(Game.cpu.getUsed() - cpuStart).toFixed(2)}`);
});
