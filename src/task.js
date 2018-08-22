import React from 'react'
import {CollectionItem} from 'react-materialize'
import {Draggable} from 'react-beautiful-dnd'
import {Row, Input, Col} from 'react-materialize'

class Task extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovering: false
    }
    this.handleMouseHover = this.handleMouseHover.bind(this)
  }

  handleMouseHover () {
    let {isHovering} = this.state
    this.setState({
      isHovering: !isHovering
    })
  }

  render () {
    const task = this.props.task
    let {isHovering} = this.state
    let actionButtonClass = `${isHovering ? 'material-icons amber-text text-darken-4 right action-icons' : 'hide'}`

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (

          <li className={snapshot.isDragging ? 'collection-item light-blue lighten-3 z-depth-5 smooth-color-transition' : 'collection-item smooth-color-transition'}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
          >

            <Row className='white task-item-row'>
              <Col s={12} className={snapshot.isDragging ? 'light-blue lighten-3 smooth-color-transition' : 'smooth-color-transition'}>
                <div className={snapshot.isDragging ? 'toolbar' : 'toolbar white'}>
                  <i {...provided.dragHandleProps}
                    className={snapshot.isDragging || isHovering ? 'material-icons right action-icons grey-text' : 'hide'}
                  >drag_indicator</i>

                  <i className={snapshot.isDragging || isHovering ? 'material-icons right action-icons grey-text' : 'hide'}

                  >view_module</i>
                </div>
                <Input className='strikethrough' name='group1' type='checkbox' value='red' label={task.content} />

              </Col>
            </Row>

          </li>

        )}
      </Draggable>
    )
  }
}

export default Task
