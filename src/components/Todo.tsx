import * as React from 'react'
import { Link } from 'react-router-dom';
import { Input, Button, Collection, CollectionItem, Row, Col, Icon } from 'react-materialize';
import { Content, ContentTypes, Enums } from 'sn-client-js'
import { Actions } from 'sn-redux'


interface TodoProps {
    content: ContentTypes.Task,
    onClick: any,
    onDeleteClick: any
}

export class Todo extends React.Component<TodoProps, {}> {
    render() {
        let comp = '';
        if (this.props.content.Status && this.props.content.Status[0] === 'completed')
            comp = 'checked'
        let displayName = this.props.content.DisplayName;
        let link = `/edit/` + this.props.content.Id;

        return (
            <Collection>
                <CollectionItem>
                    <Row style={{ marginBottom: 0 }}>
                        <Col s={12} m={8} l={8} style={{ paddingTop: 7 }}>
                            <Input
                                type='checkbox'
                                defaultChecked={comp}
                                onChange={this.props.onClick}
                                label={this.props.content.DisplayName}
                                style={{ marginTop: 10 }}
                            />
                        </Col>
                        <Col s={12} m={4} l={4} style={{ textAlign: 'center' }}>
                            <Link to={link}>
                                <Button className='cyan' waves='light' icon='edit' style={{ marginRight: 10 }}>
                                </Button>
                            </Link>
                            <Button className='deep-orange' waves='light' icon='delete' onClick={() => this.props.onDeleteClick(this.props.content, true)} />
                        </Col>
                    </Row>
                </CollectionItem>
            </Collection>
        )
    }
}