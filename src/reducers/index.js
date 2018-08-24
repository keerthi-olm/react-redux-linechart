import { combineReducers } from 'redux';
import linechartReducer from './linechartReducer';

export default combineReducers({
  linechart: linechartReducer
});
