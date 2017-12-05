import * as React from 'react'
import { Collection, CollectionItem } from 'react-materialize';
import { ContentTypes, Enums, Repository, SavedContent } from 'sn-client-js'
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
    const { repository } = this.props
    if (this.props.collection.length > 0) {
      return (
        <Collection>
          {
            this.props.collection.map(content => {
              let c = repository.HandleLoadedContent<ContentTypes.Task>(content as SavedContent)
              return (<CollectionItem key={c.Id}>
                <Todo key={c.Id}
                  content={c}
                  onClick={() => {
                    c.Status = c.Status[0] === Enums.Status.active ? Enums.Status.completed : Enums.Status.active
                    this.props.onTodoClick(c)
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
