import * as React from 'react'
import { Collection, CollectionItem } from 'react-materialize';
import { ContentTypes } from 'sn-client-js'
import { Todo } from './Todo'

const style = {
  emptyList: {
    marginTop: '20px',
    textAlign: 'center'
  }
}

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
    if (this.props.collection.length > 0) {
      return (
        <Collection>
          {
            this.props.collection.map(content =>
              <CollectionItem key={content.Id}>
                <Todo key={content.Id}
                  {...content}
                  collection={[]}
                  onClick={() => this.props.onTodoClick(content.Id, ContentTypes.Task, { Status: content.Status[0] === 'active' ? 'completed' : 'active' })}
                  onDeleteClick={this.props.onDeleteClick}
                />
              </CollectionItem>
            )}
        </Collection>
      )
    }
    else {
      return (
        <div style={style.emptyList}>Add a task first!</div>
      )
    }
  }
}
