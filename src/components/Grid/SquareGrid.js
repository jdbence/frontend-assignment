import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import d3 from "d3";

var placedMarkerCount = 0;
var isDisabled = false;
var output = true;

const scale = (x) => {
  return 3 * x;
};

const scaleInput = (x) => {
  return 30 * x;
};

class SquareGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: "false",
      disableAttr : {"disabled":"true"}
    }
  }
  renderSquares(){
    return (xcoord, index) => {
      return this.props.xDimensionArrProp.map(this.twoDimensionSquares(xcoord));
    };
  };

  twoDimensionSquares(xcoords){
    return (ycoords, index) => {
      const squareProps = {
        x: scale(xcoords),
        y: scale(ycoords),
        key: index,
        width: "30",
        height: "30",
        stroke: "black",
        fill: "transparent",
        strokeWidth: "1"
      };
      return <rect onDrop = {this.drop}
      onDragOver = {this.allowDrop} {...squareProps}/>
    }
  }

  renderTextElements(direction){
    return (coordinate, index) => {
      var xVal, yVal;
      if (direction == "horizontal") {
        xVal = scale(coordinate) + 10;
        yVal = 15;
      } else {
        xVal = 10;
        yVal = scale(coordinate) + 15;
      }
      const textProps = {
        x: xVal,
        y: yVal,
        key: index,
        fill: "black"
      };
      return <text {...textProps
      } > {
        coordinate/10
      } < /text>;

    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop=(ev)=>{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("markerId");
    var backgroundColor = ev.dataTransfer.getData("backgroundColor");
    var draggedElem = document.getElementById(data);
    draggedElem.setAttribute("style", "display:none");
    ev.target.setAttribute("fill", backgroundColor);
    var x = draggedElem.getAttribute("data-x");
    var y = draggedElem.getAttribute("data-y");
    var x1 = ev.target.getAttribute("x");
    var y1 = ev.target.getAttribute("y");
    placedMarkerCount++;
    if (scaleInput(x) != x1 || scaleInput(y) != y1) {
      output = false;
    }
    this.updateIsDisabled();
  }

  checkValid() {
    if (output  == true) {
      alert("Correct!");
    } else {
      alert("incorrect ....Try again..");
    }
  }

  updateIsDisabled() {
    if (placedMarkerCount == this.props.markerCount) {
      this.state.isDisabled = "false";
      this.setState({isDisabled: "false",disableAttr : {}});
    } else {
      this.state.isDisabled = "true";
      this.setState({isDisabled: "true",disableAttr : {"disabled":"true"}});
    }
  }

  render() {
    var that = this;
    console.log(this.state);
    return <div >
    < svg width = "400"
    height = "400" >
    < g >
    {this.props.xDimensionArrProp.map(this.renderTextElements("horizontal"))}
    < /g>
    < g >
    {this.props.xDimensionArrProp.map(this.renderTextElements("vertical"))}
    < /g>
    < g >
    {this.props.xDimensionArrProp.map(this.renderSquares())}
    < /g>
    <g>
    <text x="340" y="15" fill="black"> X </text>
    <text x="10" y="345" fill="black"> Y </text>
    </g>
    < /svg>
    <br/>
    < button className = "btn"
    onClick = {that.checkValid}
    id = "check-btn"  {...this.state.disableAttr} >
    Check < /button> < /div>
  }
}

export default SquareGrid
