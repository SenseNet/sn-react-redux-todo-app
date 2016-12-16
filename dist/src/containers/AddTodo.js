"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const RaisedButton_1 = require("material-ui/RaisedButton");
const sn_redux_1 = require("sn-redux");
const sn_client_js_1 = require("sn-client-js");
let AddTodo = ({ dispatch }) => {
    let input;
    return (React.createElement("div", null,
        React.createElement("form", { onSubmit: e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                let content = sn_client_js_1.Content.Create('Task', {
                    Type: 'Task',
                    DisplayName: input.value
                });
                content['Status'] = 'active';
                const url = '/workspaces/Project/budapestprojectworkspace/Tasks';
                dispatch(sn_redux_1.Actions.CreateContent(url, content));
                input.value = '';
            } },
            React.createElement("input", { className: 'textField', ref: node => {
                    input = node;
                } }),
            React.createElement(RaisedButton_1.default, { type: 'submit', primary: true, label: 'Add Todo' }))));
};
AddTodo = react_redux_1.connect()(AddTodo);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddTodo;

//# sourceMappingURL=AddTodo.js.map
