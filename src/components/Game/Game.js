import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'

import { swal } from 'react-redux-sweetalert'
import classes from './Game.scss'
import Marker from './Marker'
import Grid from './Grid'

const CS = 40
const topPadding = 7
const leftPadding = 26
const initialState = {
  markers: [
    {
      id: 0,
      position: [30, 100],
      coordinates: []
    },
    {
      id: 1,
      position: [30, 180],
      coordinates: []
    },
    {
      id: 2,
      position: [30, 260],
      coordinates: []
    },
    {
      id: 3,
      position: [30, 340],
      coordinates: []
    }
  ]
}
const getCoordinate = () => Math.floor(Math.random() * 11)
const task = initialState.markers.map(el => [getCoordinate(), getCoordinate()])

class Game extends Component {

  static propTypes = {
    swal: React.PropTypes.function
  }

  constructor (props) {
    super(props)
    this.state = initialState
  }

  snapToGrid = (x, y) => {
    const {offsetLeft} = this.scene
    const snappedX = Math.round(x / CS) * CS + offsetLeft - 14
    const snappedY = Math.round(y / CS) * CS + topPadding

    return [snappedX, snappedY]
  };

  moveMaker = (x, y, id) => {
    const {top, left} = this.scene.getBoundingClientRect()
    const {offsetLeft} = this.scene
    const [snappedX, snappedY] = this.snapToGrid(x - left, y - top)

    const [x0, y0] = [offsetLeft + leftPadding, topPadding]

    if (snappedX >= x0 && snappedX <= x0 + CS * 10 && (snappedY >= y0 && snappedY <= y0 + CS * 10)) {
      const nextState = {
        id,
        position: [snappedX, snappedY],
        coordinates: [Math.round((snappedX - x0) / CS), 10 - Math.round((snappedY - y0) / CS)]
      }
      this.setState(prevState => ({
        markers: prevState.markers.map(m => m.id === id ? nextState : m)
      }))
    }
  };

  reset = () => {
    this.setState(initialState)
  };

  check = () => {
    const check = this.state.markers.reduce(
      (check, m) => m.coordinates.join('') === task[m.id].join('') ? check : false,
      true
    )

    if (check) {
      this.props.swal({
        title: 'Congratulations!',
        type: 'success',
        text: 'You successfully complited task!'
      })
    } else {
      this.props.swal({
        title: 'Failed',
        type: 'error',
        text: 'Try once more!'
      })
    }
  };

  getScene = scene => {
    this.scene = scene
  };

  render () {
    const { markers } = this.state

    return (
      <div
        className={classes.game}
      >

        {markers.map(el => <Marker key={el.id} id={el.id} position={el.position} />)}

        {initialState.markers.map(el => (
          <div
            className={classes.hint}
            key={el.id}
            style={{
              left: el.position[0],
              top: el.position[1]
            }}
          >
            📍
          </div>
        ))}
        <div className={classes.sidebar}>
          {task.map((el, i) => <div key={i} className={classes.task}>{`(${el[0]}, ${el[1]})`}</div>)}
        </div>
        <Grid getScene={this.getScene} handleDrop={this.moveMaker} />

        <button onClick={this.check}>Check</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}
export default connect(null, {
  swal
})(DragDropContext(HTML5Backend)(Game))
