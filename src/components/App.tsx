import * as React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { connect } from 'react-redux'
import { Authentication, ContentTypes, Content } from 'sn-client-js';

import { FilterMenu } from './FilterMenu'
import VisibleTodoList from '../containers/VisibleTodoList'

import { Actions, Reducers } from 'sn-redux';
import Login from '../containers/Login';
import { NewView, EditView, ShortText } from 'sn-controls-react'
import { Menu } from './Menu'
import { Preloader } from 'react-materialize'

const history = createBrowserHistory()

const styles = {
  loader: {
    textAlign: 'center'
  }
}

export interface AppProps {
  loginState,
  store,
  repository,
  filter,
  editSubmitClick: Function,
  createSubmitClick: Function,
  id: number
}

class App extends React.Component<AppProps, { content: Content, params }> {
  public name: string = '';
  public password: string = '';
  public LoginState: Authentication.LoginState;
  public listView: any;
  public newView: any;
  public editView: any;
  public schema: any;

  constructor(props) {
    super(props);

    this.state = {
      content: Content.Create({
        Path: '/Root/Sites/Default_Site/tasks',
        Status: 'active' as any
      }, ContentTypes.Task, this.props.repository),
      params: this.props
    }

    this.listView = () => {
      return (
        <div>
          <h4>Todos</h4>
          <FilterMenu />
          <VisibleTodoList params repository={this.props.repository} />
        </div>
      )
    }

    this.editView = ({ match }) => {
      let selectedContent = Reducers.getContent(this.props.store.collection.byId, match.params.id)
      let content = this.props.repository.HandleLoadedContent(selectedContent)
      if (content && content !== 'undefined') {
        return <EditView content={content} history={history} onSubmit={this.props.editSubmitClick} />
      }
    }

    this.newView = ({ match }) => <NewView content={this.state.content} onSubmit={this.props.createSubmitClick} />
  }

  render() {
    let isLoggedin = (this.props.loginState === 2);
    let isPending = (this.props.loginState === 0);
    if (isLoggedin) {
      return (
        <Router>
          <div>
            <Route exact path='/' component={this.listView} />
            <Route path='/edit/:id' component={this.editView} />
            <Route path='/new/:type' component={this.newView} />
            <Route path='/browse/:filter' component={this.listView} />
            <Menu content />
          </div>
        </Router>
      )
    }
    else if (isPending) {
      return (
        <div style={styles.loader}>
          <Preloader flashing />
        </div>
      )
    }
    else {
      return (
        <div>
          <Login props={{ name: this.name, password: this.password }} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, match) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet),
    store: state
  }
}

const userLogin = Actions.UserLogin;
const update = Actions.UpdateContent;
const create = Actions.CreateContent;

export default connect(
  mapStateToProps,
  {
    loginClick: userLogin,
    editSubmitClick: update,
    createSubmitClick: create
  })(App as any);


