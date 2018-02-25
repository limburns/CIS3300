import {
  EXERCISES_FETCH_SUCCESS,
  EXERCISES_RESET
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISES_FETCH_SUCCESS:
      return action.payload;
    case EXERCISES_RESET:
      return action.payload;
    default:
      return state;
  }
};
