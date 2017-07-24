import * as React from 'react'
import FilterLink from '../containers/FilterLink'
import { setVisibilityFilter } from '../reducers/filtering'
import { connect } from 'react-redux'

export class FilterMenu extends React.Component<{}, {}> {
  render() {
    return (
      <div className='tabs tab-demo z-depth-1' style={{textAlign: 'center'}}>
        <FilterLink filter='All'>
          All
      </FilterLink>
        <FilterLink filter='Active'>
          Active
      </FilterLink>
        <FilterLink filter='Completed'>
          Completed
      </FilterLink>
      </div>
    )
  }
}