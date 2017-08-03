import {combineReducers} from 'redux';

let stateP = {
  mellow: 0,
  concentration: 0,
  rawFFT0: 0
};

const pReducer = function (state = stateP, action) {
  let newState = Object.assign({}, state);
  if (action.type === 'updateMellow') {
    newState.mellow = action.payload;

  } else if (action.type === 'updateConcentration') {
    newState.concentration = action.payload;

  } else if (action.type === 'updateRaw') {
    newState.rawFFT0 = action.payload;
  }
  return newState;
};

const uReducer = function(state = { u1: '', u2: '' }, action ) {
  let newState = Object.assign({}, state);
  return newState;
};

export default combineReducers({
  p: pReducer,
  u: uReducer
});
