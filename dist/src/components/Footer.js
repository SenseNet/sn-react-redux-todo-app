"use strict";
const React = require("react");
const FilterLink_1 = require("../containers/FilterLink");
class Footer extends React.Component {
    render() {
        return (React.createElement("p", null,
            "Show:",
            ' ',
            React.createElement(FilterLink_1.FilterLink, { filter: 'All' }, "All"),
            ', ',
            React.createElement(FilterLink_1.FilterLink, { filter: 'Active' }, "Active"),
            ', ',
            React.createElement(FilterLink_1.FilterLink, { filter: 'Completed' }, "Completed")));
    }
}
exports.Footer = Footer;

//# sourceMappingURL=Footer.js.map
