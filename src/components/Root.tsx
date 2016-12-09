import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as mui from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';
const lightMuiTheme = getMuiTheme(lightBaseTheme);


export interface RootProps {
    store: any;
}

export class Root extends React.Component<RootProps, {}>{
    render() {
        return (
            <Provider store={this.props.store}>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <Router history={browserHistory}>
                        <Route path="/(:filter)" component={App} />
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}
