"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const List_1 = require("material-ui/List");
const Todo_1 = require("./Todo");
class TodoList extends React.Component {
    render() {
        return (React.createElement(List_1.List, null, this.props.collection.map(content => React.createElement(Todo_1.Todo, __assign({ key: content.Id }, content, { collection: [], onClick: () => this.props.onTodoClick(content.Id, { Status: content.Status[0] === 'active' ? 'completed' : 'active' }), onDeleteClick: this.props.onDeleteClick })))));
    }
}
exports.TodoList = TodoList;

//# sourceMappingURL=TodoList.js.map
