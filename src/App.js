import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import LineChart from './charts/LineChart'

import './pure.css';
import './style.css';

class App extends Component {
  render() {
    return (
       <div>
            <div className="pure-g container">
               <div className="pure-u-1">
                <div className="bottom-right-svg">

                    <LineChart/>

                     
                </div>
            </div>
            </div>
            </div>
    );
  }
}

export default App;
