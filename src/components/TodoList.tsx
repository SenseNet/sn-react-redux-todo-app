import { Status, Task } from '@sensenet/default-content-types'
import List, { ListItem } from 'material-ui/List'
import * as React from 'react'
import { Todo } from './Todo'

const style = {
  emptyList: {
    marginTop: '20px',
    textAlign: 'center',
  },
}

export interface TodoListProps {
  collection: TodoListItem[],
  onTodoClick: any,
  onDeleteClick: any
}

type TodoListItem = Task

export class TodoList extends React.Component<TodoListProps, {}> {
  public render() {
    if (this.props.collection.length > 0) {
      return (
        <List>
          {
            this.props.collection.map((content) => {
              const c = content as Task
              return (<ListItem key={c.Id}>
                <Todo key={c.Id}
                  content={c}
                  onClick={() => {
                    const vmi = { Status: c.Status[0] === Status.active ? Status.completed : Status.active } as Partial<Task>
                    this.props.onTodoClick(c.Id, vmi)
                  }}
                  onDeleteClick={this.props.onDeleteClick}
                />
              </ListItem>)
            },
            )}
        </List>
      )
    } else {
      return (
        <div style={style.emptyList}>Add a task first!</div>
      )
    }
  }
}
