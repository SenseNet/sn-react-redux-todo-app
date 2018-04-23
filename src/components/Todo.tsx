import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import { Task } from '@sensenet/default-content-types'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import * as React from 'react'

import { Link } from 'react-router-dom'

interface TodoProps {
    content: Task,
    onClick: any,
    onDeleteClick: any
}

export class Todo extends React.Component<TodoProps, { comp }> {
    constructor(props) {
        super(props)
        this.state = {
            comp: this.props.content.Status && this.props.content.Status[0] === 'completed' ? true : false,
        }
    }
    public render() {
        const link = `/edit/` + this.props.content.Id
        const { content, onClick } = this.props
        return (
            <Grid container>
                <Grid sm={12} md={8} lg={8} style={{ paddingTop: 7 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.comp}
                                onChange={onClick('checkedA')}
                                value="comp"
                            />
                        }
                        label={content.DisplayName}
                    />
                </Grid>
                <Grid sm={12} md={4} lg={4} style={{ textAlign: 'center' }}>
                    <Link to={link}>
                        <IconButton aria-label="Edit">
                            <CreateIcon />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="Delete" onClick={() => this.props.onDeleteClick(this.props.content, true)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}
