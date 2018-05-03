
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import * as React from 'react'
import FilterLink from '../containers/FilterLink'

/**
 * class
 */
export class FilterMenu extends React.Component<{}, {}> {
  /**
   * render
   */
  public render() {
    return (
      <AppBar position="static">
        <Toolbar>
            <FilterLink filter="All">
              All
      </FilterLink>
            <FilterLink filter="Active">
              Active
      </FilterLink>
            <FilterLink filter="Completed">
              Completed
      </FilterLink>
        </Toolbar>
      </AppBar>
    )
  }
}
