import { combineReducers } from 'redux';
import gameboard from './gameboard';
import player from './player';
import message from './message';

const rootReducer = combineReducers({
  gameboard,
  player,
  message
});

export default rootReducer;
