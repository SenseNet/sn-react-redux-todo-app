import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from 'redux';
import { Footer } from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { getLoginState } from '../reducers/loginState';

import { Actions } from 'sn-redux';
import { Observable } from 'rxjs/Observable';
import { Authentication } from 'sn-client-js';
import Login from '../containers/Login';

export interface AppProps {
  loginState,
  store
}

class App extends React.Component<AppProps, {}> {
  public name: string = '';
  public password: string = '';
  public LoginState: Authentication.LoginState;
  public CurrentState: Authentication.LoginState;
  public isAuthenticated: boolean;

  constructor(props) {
    super(props);
    this.isAuthenticated = false;
    this.handler = this.handler.bind(this)
  }

  handler(e) {
    e.preventDefault()

    if (this.props.loginState === Authentication.LoginState.Unauthenticated) {
      this.setState({ isAuthenticated: false });
    }
    else {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    let isLoggedin = (this.props.loginState === 2);
    if (isLoggedin) {
      return (
        <div>
          <AddTodo dispatch />
          <Footer />
          <VisibleTodoList params />
        </div>
      )
    }
    else {
      return (
        <div>
          <Login dispatch handler={this.handler} props={{ name: this.name, password: this.password }} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: getLoginState(state.collection),
    store: state
  }
}

const userLogin = Actions.UserLogin;
const userLogout = Actions.UserLogout;

export default connect(
  mapStateToProps,
  {
    loginClick: userLogin,
  })(App as any);


