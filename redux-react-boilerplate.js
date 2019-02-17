//reducer- index.js
import { combineReducers } from 'redux';
import {linechart,Tip} from './linechartReducer';

export default combineReducers({
  linechart: linechart,
  toolTip: Tip
});


//*******************************************************
//reducer- linechartReducer.js
import { FETCH_POSTS, NEW_POST } from '../actions/types';
import {chartDefaults,toolTip,rainFallData} from '../charts/chartDefaults';
//1]add new  states here and initialise. ie detail:{test:'a'}
// Intial state can be put higher up--- needs research



const initialState = {
  toolTip: {...toolTip},
  linechartDefaults:{...chartDefaults,data:[...rainFallData.england],region:'england'}

};



export function linechart(state = initialState.linechartDefaults, action) {
  switch (action.type) {
    case 'GET_MAPDATA':
      return {
        ...state,
        data: action.payload.data,region: action.payload.region
      };
     case 'RESIZE':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height
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

//*******************************************************
//action types.js 
export const FETCH_POSTS = 'FETCH_POSTS';
export const NEW_POST = 'NEW_POST';




//*******************************************************
//action LinechartActions.js

export function showtip(toolTip) {

    return {
        type: 'SHOW_TOOLTIP',
        payload:toolTip
    };

}
export function hidetip(toolTip) {

    return {
        type: 'HIDE_TOOLTIP',
        payload:toolTip
    };

}
export function getMapData(payload) {

    return {
        type: 'GET_MAPDATA',
        payload:payload
    };

}

export function resize(payload) {

    return {
        type: 'RESIZE',
        payload:payload
    };

}





//*******************************************************
//store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {chartDefaults} from './charts/chartDefaults';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;



//*******************************************************
//susage in app

class App extends Component {
  render() {
    return (

                   <Provider store={store}>
                     <LineChart/>
                   </Provider> 

 
    );
  }
}


in linechart component LineChart.jsx  

export class LineChart extends React.Component {...    }

add >>>>>>>


import { showtip,hidetip,getMapData} from '../actions/linechartActions';


....and at the bottom , to initialise state , add >>>>>>>>>>>>

const mapStateToProps = state => ({
 ...state.linechart,toolTip:state.toolTip
  
});    

export default connect(mapStateToProps,{showtip,hidetip,getMapData})(LineChart);

