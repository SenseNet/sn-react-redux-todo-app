import * as React from 'react';
import { Provider } from 'react-redux';
import App from './App';


export interface RootProps {
    store: any;
    repository: any;
}

export class Root extends React.Component<RootProps, {}> {
    render() {
        return (
            <Provider store={this.props.store} >
                <App params repository={this.props.repository}/>
            </Provider>
        )
    }
}
