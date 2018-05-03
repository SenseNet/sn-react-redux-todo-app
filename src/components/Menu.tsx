import AddIcon from '@material-ui/icons/Add'
import Button from 'material-ui/Button'
import * as React from 'react'
import {
    Link,
} from 'react-router-dom'

const styles = {
    actionButton: {
        color: '#fff',
        position: 'fixed',
        bottom: 10,
        right: 10,
    },
}

export interface MenuProps {
    content
}

export class Menu extends React.Component<MenuProps, {}> {
    public render() {
        return (
            <Button variant="fab" color="primary" aria-label="add" style={styles.actionButton as any}>
                <Link to="/new/Task">
                    <AddIcon style={{ color: '#fff', marginTop: 5 }} />
                </Link>
            </Button>
        )
    }
}
