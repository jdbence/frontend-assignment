import React, {Component} from 'react'
import {scaleLinear} from 'd3-scale'
import {select} from 'd3-selection'
import {axisLeft, axisBottom} from 'd3-axis'
import {DropTarget} from 'react-dnd'

import classes from './Game.scss'

const gridTarget = {
  drop (props, monitor, component) {
    const {id} = monitor.getItem()
    const {x, y} = monitor.getSourceClientOffset()
    props.handleDrop(x, y, id)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Grid extends Component {

  static propTypes = {
    connectDropTarget: React.PropTypes.function,
    isOver: React.PropTypes.function,
    getScene: React.PropTypes.function
  }

  componentDidMount () {
    this.drawGrid(this.grid)
  }

  drawGrid (grid) {
    let xGridScale = scaleLinear().domain([0, 10]).range([0, 400])

    let yGridScale = scaleLinear().domain([10, 0]).range([0, 400])

    let xAxis = axisBottom().scale(xGridScale).tickSizeInner(-400).ticks(10).tickSizeOuter(0).tickPadding(10)

    let yAxis = axisLeft().scale(yGridScale).tickSizeInner(-400).ticks(10).tickSizeOuter(0).tickPadding(8)

    let gridNode = select(grid)

    gridNode.append('g').attr('class', 'x axis').attr('transform', 'translate(30,450)').call(xAxis)

    gridNode.append('g').attr('class', 'y axis').attr('transform', 'translate(30,50)').call(yAxis)
  }

  getGrid = (grid) => {
    this.grid = grid
  }
  render () {
    const {connectDropTarget, isOver, getScene} = this.props

    return connectDropTarget(
      <div
        ref={getScene}
        className={classes.board}
        style={{opacity: isOver ? '0.8' : '1'}}
      >
        <svg
          width={470}
          height={470}
          ref={this.getGrid}
        />
      </div>
    )
  }
}

export default DropTarget('MARKER', gridTarget, collect)(Grid)
