import * as at from '../actions/actionTypes';

const initialState = {
  health: 100,
  xp: 100,
  weapon: { name: 'hands', damage: 5, image: '🙌' }
};

const player = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.CHANGE_HEALTH:
      return { ...state, health: payload };
    case at.ADD_WEAPON:
      return {
        ...state,
        weapon: { name: payload.name, damage: payload.damage, image: payload.image }
      };
    case at.ADD_XP:
      return { ...state, xp: payload };
    case at.RESTART:
      return initialState;
    default:
      return state;
  }
};

export default player;
