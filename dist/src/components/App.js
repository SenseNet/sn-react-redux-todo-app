"use strict";
const React = require("react");
const Footer_1 = require("./Footer");
const AddTodo_1 = require("../containers/AddTodo");
const VisibleTodoList_1 = require("../containers/VisibleTodoList");
const App = () => (React.createElement("div", null,
    React.createElement(AddTodo_1.default, { dispatch: true }),
    React.createElement(VisibleTodoList_1.default, { params: true }),
    React.createElement(Footer_1.Footer, null)));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;

//# sourceMappingURL=App.js.map
