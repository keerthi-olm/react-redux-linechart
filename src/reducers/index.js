import { combineReducers } from 'redux';
import {linechart,Tip} from './linechartReducer';

export default combineReducers({
  linechart: linechart,
  toolTip: Tip
});
