import * as at from '../actions/actionTypes';
import update from 'immutability-helper';

const initialState = {
  dungeon: [[]],
  gameLevel: 0,
  playerPos: [],
  fogMode: true
};
const gameboard = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.CREATE_BOARD:
      return {
        ...state,
        dungeon: payload.dungeon,
        playerPos: payload.playerPos
      };
    case at.TOGGLE_FOG:
      return { ...state, fogMode: !state.fogMode };
    case at.MODIFY_BOARD:
      const [x, y] = payload.gbPos;
      const dungeon = update(state.dungeon, { [x]: { [y]: { $set: payload.gbPiece } } });
      return { ...state, dungeon };
    case at.MOVE_PLAYER:
      return {
        ...state,
        playerPos: payload
      };
    case at.NEW_LEVEL:
      //console.log(payload);
      return {
        ...state,
        gameLevel: payload
      };
    default:
      return state;
  }
};
export default gameboard;
