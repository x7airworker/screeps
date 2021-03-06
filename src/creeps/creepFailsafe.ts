// ensure no creep will ever get lost in rooms he's not supposed to be in

import globals from "core/globals";

export default function (creep: Creep): void {
  for (const room in globals.CONTROLLED_ROOMS) {
    if (creep.room === Game.rooms[room]) {
      return;
    }
  }

  creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(globals.CONTROLLED_ROOMS.MAIN) as any) as any);
  return;
}
