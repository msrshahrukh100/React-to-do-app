import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import initialData from './initial-data'
import Column from './column'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'


class InnerList extends React.PureComponent {

  // shouldComponentUpdate(nextProps) {
  //   if(
  //     nextProps.column === this.props.column &&
  //     nextProps.taskMap === this. props.taskMap &&
  //     nextProps.index === this.props.index
  //     ) {
  //     return false
  //   }

  //   return true
  // }

  render() {
    const { column, taskMap, index } = this.props
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return (<Column column={column} tasks={tasks} index={index} />)
  }
}


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialData
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState)
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start == finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      this.setState(newState)
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    this.setState(newState)
  }

  render () {
    const columnOrder = this.state.columnOrder
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
      >
      <Droppable 
      droppableId="all-columns" 
      direction="horizontal" 
      type="column"
      >
        {provided => (
          <div 
          className="row card-board" 
          style={{overflow: "auto"}}
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
          {columnOrder.map((columnId, index) => {
          const column = this.state.columns[columnId]
          // const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
          return (
            <InnerList 
            key={column.id} 
            column={column} 
            index={index} 
            taskMap={this.state.tasks} />)
          })}
          {provided.placeholder}
          </div>

          )}

      </Droppable>
      </DragDropContext>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
