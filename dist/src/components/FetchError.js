"use strict";
const React = require("react");
const RaisedButton_1 = require("material-ui/RaisedButton");
class FetchError extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("p", null,
                "Could not fetch content. ",
                this.props.message),
            React.createElement(RaisedButton_1.default, { onClick: this.props.onRetry, label: 'Retry', secondary: true })));
    }
}
exports.FetchError = FetchError;

//# sourceMappingURL=FetchError.js.map
