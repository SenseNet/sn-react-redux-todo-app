"use strict";
const React = require("react");
const Table_1 = require("material-ui/Table");
const Checkbox_1 = require("material-ui/Checkbox");
const delete_1 = require("material-ui/svg-icons/action/delete");
class Todo extends React.Component {
    render() {
        let comp = this.props.Status.indexOf('completed') > -1 ? true : false;
        let displayName = this.props.DisplayName;
        let content = this.props;
        return (React.createElement(Table_1.Table, null,
            React.createElement(Table_1.TableBody, { displayRowCheckbox: false },
                React.createElement(Table_1.TableRow, { selectable: false },
                    React.createElement(Table_1.TableRowColumn, null,
                        React.createElement(Checkbox_1.default, { checked: comp, onCheck: this.props.onClick, label: this.props.DisplayName })),
                    React.createElement(Table_1.TableRowColumn, null,
                        React.createElement(delete_1.default, { onClick: () => this.props.onDeleteClick(content.Id, true) }))))));
    }
}
exports.Todo = Todo;

//# sourceMappingURL=Todo.js.map
