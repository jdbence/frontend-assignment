import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import d3 from "d3"
import classes from './Grid.scss'

class MarkerWindowLeft extends React.Component {
 render() {
  this.state = {
   markerCoords: randomDataSet()
  };
  var drag = (ev)=>{
   ev.dataTransfer.setData("markerId", ev.target.id);
   ev.dataTransfer.setData("backgroundColor", colors[parseInt(ev.target.id.substr(-1,1))]);
  };
  return (
   <div className={classes.markerWindow}>

   < div className={[classes.markerRow,classes.header].join(" ")} >
   <span> X </span>
    <span> Y </span>
    <span> Marker </span>
   </div>

  < div className={classes.markerRow} >
  <span>{this.state.markerCoords[0][1]} </span>
  <span> {this.state.markerCoords[0][0]} < /span>
  < span className={[classes.marker, classes.marker0].join(" ")}
   id = "marker-0"
   data-x = {this.state.markerCoords[0][1]}
   data-y = {this.state.markerCoords[0][0]}
   draggable = "true"
   onDragStart = {drag}
   onClick ={drag} >
   < /span>
   < /div>

   < div  className={classes.markerRow}  >
   <span>{this.state.markerCoords[1][1]} </span>
   <span> {this.state.markerCoords[1][0]} < /span>
   < span className={[classes.marker, classes.marker1].join(" ")}
   id = "marker-1"
   data-x = {this.state.markerCoords[1][1]}
   data-y = {this.state.markerCoords[1][0]}
   draggable = "true"
   onDragStart = {drag}
   onClick ={drag} >
   < /span>
   < /div>

   < div  className={classes.markerRow} >
   <span>{this.state.markerCoords[2][1]} </span>
   <span> {this.state.markerCoords[2][0]} < /span>
   < span className={[classes.marker, classes.marker2].join(" ")}
   id = "marker-2"
   data-x = {this.state.markerCoords[2][1]}
   data-y = {this.state.markerCoords[2][0]}
   draggable = "true"
   onDragStart = {drag} >
   < /span>
   < /div>

   < div  className={classes.markerRow} >
   <span>{this.state.markerCoords[3][1]} </span>
   <span> {this.state.markerCoords[3][0]} < /span>
   < span className={[classes.marker, classes.marker3].join(" ")}
   id = "marker-3"
   data-x = {this.state.markerCoords[3][1]}
   data-y = {this.state.markerCoords[3][0]}
   draggable = "true"
   onDragStart = {drag} > < /span>
   < /div>

   < /div>
  );
 }
}

const colors= ["#66FA93", "#FA6693","#6693FA", "#FA66FA"];
// The number of markers
const numDataPoints = 4;

// A function that returns a random number from 1 to 10
const randomNum = () => Math.floor(Math.random() * 10 + 1);

// A function that creates an array of n elements of (x, y) coordinates.
const randomDataSet = () => {
 return Array.apply(null, {
  length: numDataPoints
 }).map(() => [randomNum(), randomNum()]);
}

export default MarkerWindowLeft
