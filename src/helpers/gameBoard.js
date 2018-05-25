import dc from './gridConstants';
import { GamePieces } from './gamePieces';
import _ from 'lodash';

export const newGameBoard = (dungeon, level) => {
  const gc = new GamePieces(level);

  let playerPos = [];
  const { gameCharacters } = gc;
  //console.log('enemies', gameCharacters.enemies);
  for (let entity in gameCharacters) {
    let gamePiece = gameCharacters[entity];
    //console.log('gp', gamePiece);

    for (let gp = 0; gp < gamePiece.length; gp++) {
      let placed = false;
      while (!placed) {
        let x = _.random(0, dc.GRID_HEIGHT - 1);
        let y = _.random(0, dc.GRID_WIDTH - 1);
        if (dungeon[x][y].type === 'floor') {
          if (entity === 'player') playerPos = [x, y];
          //console.log('placed', gamePiece[gp]);
          dungeon[x][y] = { ...gamePiece[gp] };
          placed = true;
        } else {
          placed = false;
        }
      }
    }
  }

  return { dungeon, playerPos };
};
