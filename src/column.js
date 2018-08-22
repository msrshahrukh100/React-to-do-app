import React from 'react'
import {Col, Card, Row, Collection, CollectionItem} from 'react-materialize'
import Task from './task'
import {Droppable, Draggable} from 'react-beautiful-dnd'

class InnerList extends React.Component {
  shouldComponentUpdate (nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false
    }
    return true
  }

  render () {
    return (this.props.tasks.map((task, index) => (<Task key={task.id} task={task} index={index} />)))
  }
}

class Column extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseHover = this.handleMouseHover.bind(this)

    this.state = {
      isHovering: false
    }
  }

  handleMouseHover () {
    let {isHovering} = this.state
    this.setState({
      isHovering: !isHovering
    })
  }

  render () {
    const tasks = this.props.tasks
    let {isHovering} = this.state
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided, snapshot) => (

          <div className='col s5 task-list'
            {...provided.draggableProps}
            ref={provided.innerRef}
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
          >
            <Droppable droppableId={this.props.column.id} type='task'>
              {(provided, snapshot) => (
                <Card title={this.props.column.title} className={snapshot.isDraggingOver ? 'amber smooth-color-transition lighten-3' : 'smooth-color-transition'}>

                  <ul className='collection'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <InnerList tasks={tasks} />

                    {provided.placeholder}
                  </ul>
                </Card>
              )}
            </Droppable>

            <p className='center' {...provided.dragHandleProps}>
              <i
                className={isHovering || snapshot.isDragging ? 'material-icons small action-icons grey-text' : 'hide'}
              >
                drag_indicator
              </i>

            </p>
          </div>

        )}

      </Draggable>
    )
  }
}

export default Column
