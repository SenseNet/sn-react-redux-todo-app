import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export interface FetchErrorProps {
    message: string, 
    onRetry: any
}

export class FetchError extends React.Component<FetchErrorProps, {}>{
    render() {
        return (
            <div>
                <p>Could not fetch content. {this.props.message}</p>
                <RaisedButton  onClick={this.props.onRetry} label='Retry'  secondary={true} />
            </div>
        );
    }
}
