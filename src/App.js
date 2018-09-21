import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store'; 

// import ReactDOM from 'react-dom';
import LineChart from './charts/LineChart'

import './style.css';

class App extends Component {
  render() {
    return (

                   <Provider store={store}>
                     <LineChart/>
                   </Provider> 

 
    );
  }
}

export default App;

//Step 1: Create folder structure to hold Actions and reducers ++
//Step 2: Create index.js and myReduser.js in the reducer folder. This links all other reducers
//Step 3: Create actions.js in the actions folder (Create boiler plate)
//Step 3:  Create store.js (At application root directory ) to create the store and link rootreducer here (Create boiler plate)
// ******** Root  app component -  App.js *******
// Key point here is the ** <provider > ** tag wrapper. Note need to import {provider} from redux.
// 1] Import  react-redux components at the top
// 2] Import store from the redux Store component file
// 3] Wrap application in <provider wrapper />

//*** Component level  ****
//1] Add connect and Actions ie :
//                import { connect } from 'react-redux';
//                import { itemsFetchData } from '../actions/items';
//
//2] At Bottom bring declare propTypes for the state. then map states to props ie :
//               const mapStateToProps = (state) => { myItems: PropTypes.object..... }
//3] At Bottom use Connect to link state and and actions ie
//            export default connect(mapStateToProps, { fetchPosts,getDetail })(Posts);
//                                      ^^                      ^^
//                            populate props with state    Load relavant actions
// 
// ***  Component level Firing an action and access state  **
//  Fire action ----> this.props.getDetail(detail)   Access state ---> this.props.myItems


