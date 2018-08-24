import { FETCH_POSTS, NEW_POST } from '../actions/types';
import {chartDefaults} from '../charts/chartDefaults';
//1]add new  states here and initialise. ie detail:{test:'a'}
// Intial state can be put higher up--- needs research
const initialState = {
  items: [],
  item: {},
  chartDefaults:{chartDefaults}

};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
      case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload
      };
    default:
      return state;
  }
}
