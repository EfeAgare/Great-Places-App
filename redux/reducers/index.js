import { combineReducers } from 'redux';
import { placesReducers } from './placesReducer';

const rootReducer = combineReducers({
  places: placesReducers,
});

export default rootReducer;
