import AddIcon from '@material-ui/icons/Add'
import Button from 'material-ui/Button'
import * as React from 'react'
import {
    Link,
} from 'react-router-dom'

export interface MenuProps {
    content
}

export class Menu extends React.Component<MenuProps, {}> {
    public render() {
        return (
            <Button variant="fab" color="primary" aria-label="add" >
                <Link to="/new/Task">
                    <AddIcon />
                </Link>
            </Button>
        )
    }
}
