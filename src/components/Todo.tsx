import * as React from 'react'
import { Input, Button, Collection, CollectionItem } from 'react-materialize';
import { Content } from 'sn-client-js'
import { Actions } from 'sn-redux'


export interface TodoProps {
    collection: TodoListItem[],
    DisplayName: string,
    Status: string,
    Id: number,
    onClick: any,
    onDeleteClick: any
}

interface TodoListItem {
    DisplayName: string;
    Name: string;
    Icon: string;
    Id: number;
}

interface TodoListState {
    collection: any[],
    value: string
}

export class Todo extends React.Component<TodoProps, {}> {
    render() {
        let comp = this.props.Status.indexOf('completed') > -1 ? 'checked' : '';
        let displayName = this.props.DisplayName;
        let content = this.props;
        return (
            <Collection>
                <CollectionItem>
                    <Input
                        type='checkbox'
                        defaultChecked={comp}
                        onChange={this.props.onClick}
                        label={this.props.DisplayName}
                    />
                    <Button floating icon='delete' className='red' onClick={() => this.props.onDeleteClick(content.Id, true)} />
                </CollectionItem>
            </Collection>
        )
    }
}