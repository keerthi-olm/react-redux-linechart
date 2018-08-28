import { FETCH_POSTS, NEW_POST } from '../actions/types';
import {chartDefaults,toolTip,rainFallData} from '../charts/chartDefaults';
//1]add new  states here and initialise. ie detail:{test:'a'}
// Intial state can be put higher up--- needs research

const initialState = {
  toolTip: {...toolTip},
  linechartDefaults:{...chartDefaults,data:[...rainFallData.data]}

};

export function linechart(state = initialState.linechartDefaults, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}

export function Tip(state = initialState.toolTip, action) {
  switch (action.type) {
    case 'SHOW_TOOLTIP': 
      return {
        
        ...action.payload
      };
    case 'HIDE_TOOLTIP': 
      return {
        ...action.payload
      };

    default:
      return state;
  }
}
