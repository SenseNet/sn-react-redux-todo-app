import * as React from 'react'
import { List } from 'material-ui/List';
import { Todo } from './Todo'

export interface TodoListProps {
  collection: TodoListItem[],
  onTodoClick: any,
  onDeleteClick: any
}

interface TodoListItem {
  Id: number,
  Status: string,
  DisplayName: string
}

export class TodoList extends React.Component<TodoListProps, {}> {
  render() {
    return (
      <List>
        {this.props.collection.map(content =>
          <Todo key={content.Id}
            {...content}
            collection={[]}
            onClick={() => this.props.onTodoClick( content.Id, { Status: content.Status[0] === 'active' ? 'completed' :  'active' })}
            onDeleteClick={this.props.onDeleteClick}
             />
        )}
      </List>
    )
  }
}
