import {combineReducers} from 'redux'

import configReducer from './config';
import postReducer from './post';

const reducer = combineReducers({
  configReducer,
  postReducer
});

export default reducer
