import * as React from 'react';
import { connect } from 'react-redux'
import { ODataApi, ODataHelper } from 'sn-client-js'
import { Actions } from 'sn-redux'
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers/filtering'
import { TodoList } from '../components/TodoList'
import { FetchError } from '../components/FetchError'


export interface VisibleTodoListProps {
  onTodoClick: Function,
  onDeleteClick: Function,
  collection: any,
  path: string,
  options: ODataApi.ODataParams,
  filter: string,
  fetchTodos: Function,
  requestTodos: Function,
  isFetching: false,
  errorMessage: any
}

class VisibleTodoList extends React.Component<VisibleTodoListProps, {}> {
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
    let optionObj = new ODataApi.ODataParams({
      select: ['DisplayName', 'Status']
    });
    if (filter === 'Active') {
      optionObj['filter'] = `isOf('Task') and Status eq %27Active%27`;
    }
    else if (filter === 'Completed') {
      optionObj['filter'] = `isOf('Task') and Status eq %27Completed%27`;
    }
    else {
      optionObj['filter'] = "isOf('Task')";
    }
    fetchTodos(path, optionObj);
  }

  render() {
    if (this.props.isFetching && this.props.collection.length > 0) {
      return <p>Loading...</p>
    }
    if (this.props.errorMessage && this.props.collection.length > 0) {
      return (
        <FetchError
          message={this.props.errorMessage}
          onRetry={() => this.fetchData(this.props.filter)}
          />
      )
    }
    return <TodoList collection={this.props.collection} onTodoClick={this.props.onTodoClick} onDeleteClick={this.props.onDeleteClick} />
  }
}


const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'All';
  const url = ODataHelper.getContentURLbyPath('/Root/Sites/Default_Site/tasks');
  return {
    collection: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
    options: params.options,
    path: params.path || url,
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