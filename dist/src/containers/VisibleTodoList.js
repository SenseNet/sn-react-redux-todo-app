"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const sn_client_js_1 = require("sn-client-js");
const sn_redux_1 = require("sn-redux");
const filtering_1 = require("../reducers/filtering");
const TodoList_1 = require("../components/TodoList");
const FetchError_1 = require("../components/FetchError");
class VisibleTodoList extends React.Component {
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
        let optionObj = new sn_client_js_1.ODataApi.ODataParams({
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
        if (this.props.isFetching && !this.props.collection.length) {
            return React.createElement("p", null, "Loading...");
        }
        if (this.props.errorMessage && !this.props.collection.length) {
            return (React.createElement(FetchError_1.FetchError, { message: this.props.errorMessage, onRetry: () => this.fetchData(this.props.filter) }));
        }
        return React.createElement(TodoList_1.TodoList, { collection: this.props.collection, onTodoClick: this.props.onTodoClick, onDeleteClick: this.props.onDeleteClick });
    }
}
const mapStateToProps = (state, { params }) => {
    const filter = params.filter || 'All';
    const url = '/workspaces/Project/budapestprojectworkspace/Tasks';
    return {
        collection: filtering_1.getVisibleTodos(state, filter),
        errorMessage: filtering_1.getErrorMessage(state, filter),
        isFetching: filtering_1.getIsFetching(state, filter),
        filter,
        options: params.options,
        path: params.path || url,
    };
};
const toggleTodoAction = sn_redux_1.Actions.UpdateContent;
const deleteTodoAction = sn_redux_1.Actions.Delete;
const fetchTodosAction = sn_redux_1.Actions.RequestContent;
const VisibleTodoLista = react_router_1.withRouter(react_redux_1.connect(mapStateToProps, {
    onTodoClick: toggleTodoAction,
    onDeleteClick: deleteTodoAction,
    fetchTodos: fetchTodosAction
})(VisibleTodoList));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VisibleTodoLista;

//# sourceMappingURL=VisibleTodoList.js.map
