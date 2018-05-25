import * as at from '../actions/actionTypes';
const initialState = {
  message: 'Have fun!'
};

const message = (state = initialState, { type, payload }) => {
  switch (type) {
    case at.BOARD_MSG:
      return { ...state, message: payload };
    default:
      return state;
  }
};

export default message;
