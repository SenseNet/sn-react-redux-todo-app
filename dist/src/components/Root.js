"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const App_1 = require("./App");
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
const getMuiTheme_1 = require("material-ui/styles/getMuiTheme");
const styles_1 = require("material-ui/styles");
const lightMuiTheme = getMuiTheme_1.default(styles_1.lightBaseTheme);
class Root extends React.Component {
    render() {
        return (React.createElement(react_redux_1.Provider, { store: this.props.store },
            React.createElement(styles_1.MuiThemeProvider, { muiTheme: lightMuiTheme },
                React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
                    React.createElement(react_router_1.Route, { path: "/(:filter)", component: App_1.default })))));
    }
}
exports.Root = Root;

//# sourceMappingURL=Root.js.map
