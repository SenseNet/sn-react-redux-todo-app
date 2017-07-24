import { connect } from 'react-redux'
import { setVisibilityFilter } from '../reducers/filtering'
import InnerLink from '../components/LinkInner'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.listByFilter.VisibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(InnerLink)

export default FilterLink

