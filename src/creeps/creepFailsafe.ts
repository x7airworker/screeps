// ensure no creep will ever get lost in rooms he's not supposed to be in

export default function (creep: Creep): void {
  for (const room in Game.rooms) {
    if (creep.room === Game.rooms[room]) {
      return;
    }
  }

  // Just suicide bc I'm too stupid to send the creep back to an owned room
  // creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(globals.CONTROLLED_ROOMS.MAIN) as any) as any);
  creep.suicide();
  return;
}
