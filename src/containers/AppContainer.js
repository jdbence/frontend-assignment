import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import d3 from "d3";
import MarkerWindowLeft from '../components/Grid/MarkerWindowLeft';
import SquareGrid from '../components/Grid/SquareGrid';

class AppContainer extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
        xDimension : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        markerCount: 4
     }
  }
 render() {
  return (
    <div>
      <div>
          <h1> Markers - Grid Drag and Drop </h1>
      </div>
      <div>
        <MarkerWindowLeft />
        <SquareGrid xDimensionArrProp={this.state.xDimension} markerCount={this.state.markerCount}/>
      </div>
    </div>
  )
 }
}

export default AppContainer
