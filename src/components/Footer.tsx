import * as React from 'react'
import { Tabs, Tab } from 'react-materialize'

const styles = {
  tab: {
    color: '#fff'
  },
  tabstripContainer: {
    marginTop: '20px'
  }
};

export class Footer extends React.Component<{}, {}> {
  render() {
    return (
        <Tabs className='tab-demo z-depth-1' style={styles.tabstripContainer}>
          <Tab
            title='All'
            active
            // to={this.props.filter === 'All' ? '' : this.props.filter}
            style={styles.tab}
          >All
            </Tab>
          <Tab
            title='Active'
            // to={this.props.filter === 'All' ? '' : this.props.filter}
            style={styles.tab}
          >Active
            </Tab>
          <Tab
            title='Completed'
            // to={this.props.filter === 'All' ? '' : this.props.filter}
            style={styles.tab}
          >Completed
            </Tab>
        </Tabs>
    )
  }
}