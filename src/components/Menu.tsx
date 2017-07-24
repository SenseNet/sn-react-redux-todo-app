import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { Button, Icon } from 'react-materialize'

export interface MenuProps {
    content
}

export class Menu extends React.Component<MenuProps, {}> {
    render() {
        return (
            <Button floating fab='vertical' icon='menu' className='red' large style={{ bottom: '45px', right: '24px' }}>
                <Button floating className='red'>
                    <Link to='/new/Task'>
                        <Icon>add</Icon>
                    </Link>
                </Button>
                <Button floating className='green'>
                    <Link to='/'>
                        <Icon>language</Icon>
                    </Link>
                </Button>
            </Button>
        )
    }
}