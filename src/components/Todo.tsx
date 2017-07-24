import * as React from 'react'
import { Link } from 'react-router-dom';
import { Input, Button, Collection, CollectionItem, Row, Col, Icon } from 'react-materialize';
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
        let link = `/edit/` + content.Id;

        return (
            <Collection>
                <CollectionItem>
                    <Row style={{ marginBottom: 0 }}>
                        <Col s={12} m={8} l={8} style={{ paddingTop: 7 }}>
                            <Input
                                type='checkbox'
                                defaultChecked={comp}
                                onChange={this.props.onClick}
                                label={this.props.DisplayName}
                                style={{ marginTop: 10 }}
                            />
                        </Col>
                        <Col s={12} m={4} l={4} style={{ textAlign: 'center' }}>
                            <Link to={link}>
                                <Button className='cyan' waves='light' icon='edit' style={{ marginRight: 10 }}>
                                </Button>
                            </Link>
                            <Button className='deep-orange' waves='light' icon='delete' onClick={() => this.props.onDeleteClick(content.Id, true)} />
                        </Col>
                    </Row>
                </CollectionItem>
            </Collection>
        )
    }
}