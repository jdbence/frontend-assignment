import React from 'react'
import {DragSource} from 'react-dnd'
import classes from './Game.scss'

const markerSource = {
  beginDrag (props) {
    return {id: props.id}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Marker = ({connectDragSource, isDragging, position: [x, y], id}) => connectDragSource(
  <div className={`${classes.marker} ${isDragging ? classes.isDragging : ''}`} style={{left: x, top: y}}>
    📍
  </div>
)

export default DragSource('MARKER', markerSource, collect)(Marker)
