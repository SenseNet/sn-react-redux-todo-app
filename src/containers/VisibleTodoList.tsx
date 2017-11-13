import * as React from 'react';
import { connect } from 'react-redux'
import { ODataApi, ODataHelper, ContentTypes } from 'sn-client-js'
import { Actions } from 'sn-redux'
import { withRouter } from 'react-router-dom'
import { getVisibleTodos, getErrorMessage, getIsFetching, getVisibilityFilter } from '../reducers/filtering'
import { TodoList } from '../components/TodoList'
import { FetchError } from '../components/FetchError'
import { Preloader } from 'react-materialize'

export interface VisibleTodoListProps {
  onTodoClick: Function,
  onDeleteClick: Function,
  collection: ContentTypes.Task[],
  path: string,
  options: ODataApi.IODataParams<ContentTypes.Task>,
  filter,
  fetchTodos: Function,
  requestTodos: Function,
  isFetching: false,
  visibilityFilter: any,
  errorMessage: any,
  repository
}

const styles = {
  loader: {
    margin: '0 auto'
  }
}

class VisibleTodoList extends React.Component<VisibleTodoListProps, {}> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData(this.props.filter);
  }
  componentDidUpdate(prevOps) {
    if (this.props.filter !== prevOps.filter) {
      this.fetchData(this.props.filter);
    }
  }

  fetchData(filter) {
    const { path, options, fetchTodos } = this.props;
    let optionObj = {
      select: 'all'
    };
    if (filter === 'Active') {
      optionObj['filter'] = `isOf('Task') and Status eq %27Active%27`;
    }
    else if (filter === 'Completed') {
      optionObj['filter'] = `isOf('Task') and Status eq %27Completed%27`;
    }
    else {
      optionObj['filter'] = "isOf('Task')";
    }
    fetchTodos(path, optionObj, ContentTypes.Task);
  }

  render() {
    if (this.props.isFetching && this.props.collection.length > 0) {
      return (
        <div style={styles.loader}>
          <Preloader flashing />
        </div>
      )
    }
    if (this.props.errorMessage && this.props.collection.length > 0) {
      return (
        <FetchError
          message={this.props.errorMessage}
          onRetry={() => this.fetchData(this.props.filter)}
        />
      )
    }
    return <TodoList repository={this.props.repository} collection={this.props.collection} onTodoClick={this.props.onTodoClick} onDeleteClick={this.props.onDeleteClick} />
  }
}


const mapStateToProps = (state, params) => {
  const filter = state.listByFilter.VisibilityFilter || 'All';
  const url = '/Root/Sites/Default_Site/tasks';
  return {
    collection: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    visibilityFilter: getVisibilityFilter(state),
    filter,
    path: params.path || url
  }
}

const toggleTodoAction = Actions.UpdateContent;
const deleteTodoAction = Actions.Delete;
const fetchTodosAction = Actions.RequestContent;

const VisibleTodoLista = connect(
  mapStateToProps,
  {
    onTodoClick: toggleTodoAction,
    onDeleteClick: deleteTodoAction,
    fetchTodos: fetchTodosAction
  }
)(VisibleTodoList as any);

export default VisibleTodoLista