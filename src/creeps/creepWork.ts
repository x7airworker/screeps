import JOB_FUNCTIONS from "./jobs";

export default function (): void {
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    if (creep.memory.job) {
        const jobFunction = JOB_FUNCTIONS[creep.memory.job];
        if (jobFunction)
            jobFunction(creep);
    }
  }
}
