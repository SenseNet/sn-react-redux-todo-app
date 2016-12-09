import * as React from 'react'
import { FilterLink } from '../containers/FilterLink'

export class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <p>
        Show:
      {' '}
        <FilterLink filter='All'>
          All
      </FilterLink>
        {', '}
        <FilterLink filter='Active'>
          Active
      </FilterLink>
        {', '}
        <FilterLink filter='Completed'>
          Completed
      </FilterLink>
      </p>
    )
  }
}