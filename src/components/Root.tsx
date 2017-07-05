import * as React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export interface RootProps {
    store: any;
}

export class Root extends React.Component<RootProps, {}> {
    render() {
        return (
            <Provider store={this.props.store}>
                <App params />
            </Provider>
        )
    }
}
