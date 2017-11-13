import * as React from 'react'
import { Collection, CollectionItem } from 'react-materialize';
import { ContentTypes, Enums, Repository } from 'sn-client-js'
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
  onDeleteClick: any,
  repository: Repository.BaseRepository
}

type TodoListItem = ContentTypes.Task

export class TodoList extends React.Component<TodoListProps, {}> {
  render() {
    if (this.props.collection.length > 0) {
      return (
        <Collection>
          {
            this.props.collection.map(content => {
              return (<CollectionItem key={content.Id}>
                <Todo key={content.Id}
                  content={content}
                  onClick={() => {
                    content.Status = content.Status[0] === Enums.Status.active ? Enums.Status.completed : Enums.Status.active
                    this.props.onTodoClick(content)
                  }}
                  onDeleteClick={this.props.onDeleteClick}
                />
              </CollectionItem>)
            }
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
