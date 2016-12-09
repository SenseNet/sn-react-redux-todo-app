import * as React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { Content } from 'sn-client-js'
import { Actions } from 'sn-redux'
import Delete from 'material-ui/svg-icons/action/delete';


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
        let comp = this.props.Status.indexOf('completed') > -1 ? true : false;
        let displayName = this.props.DisplayName;
        let content = this.props;
        return (
            <Table>
                <TableBody displayRowCheckbox={false}>
                    <TableRow selectable={false}>
                        <TableRowColumn>
                            <Checkbox
                                checked={comp}
                                onCheck={this.props.onClick}
                                label={this.props.DisplayName}
                                />
                        </TableRowColumn>
                        <TableRowColumn>
                         <Delete onClick={() => this.props.onDeleteClick(content.Id, true)} />
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
}