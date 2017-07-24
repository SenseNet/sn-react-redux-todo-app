import * as React from 'react';
import { Link } from 'react-router-dom';

const style = {
    active: {
        borderBottom: 'solid 2px #f6b2b5'
    }
}

export interface FilterLinkProps {
    active,
    children,
    onClick
}

class InnerLink extends React.Component<FilterLinkProps, {}> {
    render() {
        return (
            <li className='tab col'>
                <Link
                    to={this.props.children === 'All' ? '/browse/All' : '/browse/' + this.props.children}
                    onClick={e => {
                        this.props.onClick()
                    }}
                    style={(this.props.active) ? style.active : {}}
                >
                    {this.props.children}
                </Link>
            </li>
        )
    }
}

export default InnerLink