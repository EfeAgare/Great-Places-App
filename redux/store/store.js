import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import { init } from '../../helpers/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('initialize db failed');
    console.log(err);
  });

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
