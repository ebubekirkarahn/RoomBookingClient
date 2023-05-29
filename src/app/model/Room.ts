export class Room {
  id: number;
  name: string;
  location: string;
  capacities = new Array<LayoutCapacity>();

  static fromHttp(room : Room) {
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.capacities = new Array<LayoutCapacity>();
    for (const lc of room.capacities) {
      newRoom.capacities.push (LayoutCapacity.fromHttp(lc));
    }
    return newRoom;
  }
}

export class LayoutCapacity {
  layout: Layout;
  capacity: number;

  static fromHttp(lc : LayoutCapacity) {
    const newLc = new LayoutCapacity();
    newLc.capacity = lc.capacity;
    newLc.layout = Layout[lc.layout];
    return newLc;
  }

}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}
