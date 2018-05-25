import _ from 'lodash';
import dc from './gridConstants';

class Cave {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  setDoorCoords(doorX, doorY) {
    this.doorX = doorX;
    this.doorY = doorY;
  }

  setCaveCoords(x, y) {
    this.x = x;
    this.y = y;
  }
}

//check if cave can be placed on dungeon
const canPlaceCave = (dungeon, { width, height, x, y }) => {
  if (y < 1 || y + height > dungeon.length - 1) return false;
  if (x < 1 || x + width > dungeon[0].length - 1) return false;

  //check if on or adjacent to existing cave
  for (let i = y - 1; i < y + height + 1; i++) {
    for (let j = x - 1; j < x + width + 1; j++) {
      if (dungeon[i][j].type === 'floor') return false;
    }
  }
  return true;
};

const placeCave = (dungeon, { x, y, width, height, id }, type = 'floor') => {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      dungeon[i][j] = { type };
    }
  }
  return dungeon;
};

const createCaves = (dungeon, { x, y, height, width }, sizeRange = dc.CAVE_SIZE_RANGE) => {
  const [min, max] = sizeRange;

  const northCave = new Cave(_.random(min, max), _.random(min, max));
  const southCave = new Cave(_.random(min, max), _.random(min, max));
  const eastCave = new Cave(_.random(min, max), _.random(min, max));
  const westCave = new Cave(_.random(min, max), _.random(min, max));

  northCave.setCaveCoords(_.random(x, x + width - 1), y - northCave.height - 1);
  southCave.setCaveCoords(_.random(x, x + width - 1), y + height + 1);
  eastCave.setCaveCoords(x + width + 1, _.random(y, height + y - 1));
  westCave.setCaveCoords(x - westCave.width - 1, _.random(y, height + y - 1));

  northCave.setDoorCoords(
    _.random(northCave.x, Math.min(northCave.x + northCave.width, x + width) - 1),
    y - 1
  );

  southCave.setDoorCoords(
    _.random(southCave.x, Math.min(southCave.x + southCave.width, x + width - 1)),
    y + height
  );

  eastCave.setDoorCoords(
    eastCave.x - 1,
    _.random(eastCave.y, Math.min(eastCave.y + eastCave.height, y + height) - 1)
  );

  westCave.setDoorCoords(
    x - 1,
    _.random(westCave.y, Math.min(westCave.y + westCave.height, y + height) - 1)
  );
  const generatedCaves = [northCave, southCave, eastCave, westCave];

  const caves = [];
  generatedCaves.forEach(cave => {
    if (canPlaceCave(dungeon, cave)) {
      placeCave(dungeon, cave, 'floor');
      placeCave(dungeon, { x: cave.doorX, y: cave.doorY, width: 1, height: 1 }, 'floor');
      caves.push(cave);
    }
  });

  return { dungeon, caves };
};

const growDungeon = (dungeon, caves, counter = 1, maxCaves = dc.MAX_CAVES) => {
  if (counter + caves.length > maxCaves || !caves.length) {
    return dungeon;
  }

  dungeon = createCaves(dungeon, caves.pop());
  caves.push(...dungeon.caves);
  counter += dungeon.caves.length;

  return growDungeon(dungeon.dungeon, caves, counter);
};

export const createDungeon = () => {
  // dungeon is a  2D grid of GRID HEIGHT ROWS WITH EACH ROW A WIDTH OF GRID_WIDTH
  let dungeon = [...Array(dc.GRID_HEIGHT)].map(rows =>
    Array(dc.GRID_WIDTH).fill({
      type: 'cell'
    })
  );

  const [min, max] = dc.CAVE_SIZE_RANGE;
  const firstCave = {
    x: _.random(1, dc.GRID_WIDTH - max - 15),
    y: _.random(1, dc.GRID_HEIGHT - max - 15),
    height: _.random(min, max),
    width: _.random(min, max)
  };

  // put first room on the dungeon grid
  dungeon = placeCave(dungeon, firstCave, 'floor');
  return growDungeon(dungeon, [firstCave]);
};
