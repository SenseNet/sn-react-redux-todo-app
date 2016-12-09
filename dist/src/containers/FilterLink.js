"use strict";
const React = require("react");
const react_router_1 = require("react-router");
class FilterLink extends React.Component {
    render() {
        return (React.createElement(react_router_1.Link, { to: this.props.filter === 'All' ? '' : this.props.filter, activeStyle: {
                textDecoration: 'none',
                color: 'black'
            } }, this.props.children));
    }
}
exports.FilterLink = FilterLink;

//# sourceMappingURL=FilterLink.js.map
