import * as React from 'react';
import { Link } from 'react-router';

export interface FilterLinkProps {
    filter: string,
    children?: any
}

export class FilterLink extends React.Component<FilterLinkProps, {}>
{
    render() {
        return (
            <Link
                to={this.props.filter === 'All' ? '' : this.props.filter}
                activeStyle={{
                    textDecoration: 'none',
                    color: 'black'
                }}
                >
                {this.props.children}
            </Link>
        )
    }
}