import { FETCH_POSTS, NEW_POST } from '../actions/types';
import {chartDefaults,toolTip} from '../charts/chartDefaults';
//1]add new  states here and initialise. ie detail:{test:'a'}
// Intial state can be put higher up--- needs research



const initialState = {
  toolTip: {...toolTip},
  linechartDefaults:{...chartDefaults}

};
console.log(initialState.linechartDefaults);
export function linechartReducer(state = initialState.linechartDefaults, action) {
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

export function tooTipReducer(state = initialState.toolTip, action) {
  switch (action.type) {
    case 'showTip':
      return {
        ...state,
        items: action.payload
      };
    case 'hideTip':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}
