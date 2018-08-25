import { combineReducers } from 'redux';
import {linechartReducer,tooTipReducer} from './linechartReducer';

export default combineReducers({
  linechart: linechartReducer,
  toolTip: tooTipReducer
});
