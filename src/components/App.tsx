import createBrowserHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import VisibleTodoList from '../containers/VisibleTodoList'
import { FilterMenu } from './FilterMenu'

import { LoginState } from '@sensenet/client-core'
import { EditView, NewView } from '@sensenet/controls-react'
import { Task } from '@sensenet/default-content-types'
import { Actions, Reducers } from '@sensenet/redux'
import { CircularProgress } from 'material-ui/Progress'
import Login from '../containers/Login'
import { Menu } from './Menu'

const history = createBrowserHistory()

const styles = {
  loader: {
    textAlign: 'center',
  },
}

// const styles = (theme) => ({
//   button: {
//     margin: theme.spacing.unit,
//   },
//   leftIcon: {
//     marginRight: theme.spacing.unit,
//   },
//   rightIcon: {
//     marginLeft: theme.spacing.unit,
//   },
//   iconSmall: {
//     fontSize: 20,
//   },
//   loader: {
//     textAlign: 'center',
//   },
// })

interface AppProps {
  loginState,
  store,
  repository,
  filter,
  editSubmitClick,
  createSubmitClick,
  id: number
}

interface AppState {
  content,
  params,
  loginState,
  listView,
  newView,
  editView,
  schema,
  name,
  password
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {
      content: { Status: 'active' as any, Path: '/Root/Sites/Default_Site/tasks', Type: 'Task' } as Task,
      params: this.props,
      loginState: LoginState.Pending,
      name: '',
      password: '',
      listView: () => {
        return (
          <div>
            <h4>Todos</h4>
            <FilterMenu />
            <VisibleTodoList params repository={this.props.repository} />
          </div>
        )
      },
      newView: ({ match }) => <NewView content={this.state.content} repository={this.props.repository} onSubmit={this.props.createSubmitClick} />,
      editView: ({ match }) => {
        const selectedContent = Reducers.getContent(this.props.store.sensenet.children.entities, match.params.id)
        const content = selectedContent as Task
        if (content) {
          return <EditView content={content} history={history} onSubmit={this.props.editSubmitClick} repository={this.props.repository} />
        } else {
          return null
        }
      },
      schema: null,
    }
  }
  /**
   * render
   */
  public render() {
    const { loginState } = this.props
    const isLoggedin = (loginState === LoginState.Authenticated)
    const isPending = (loginState === LoginState.Pending)
    const { listView, editView, newView, name, password } = this.state
    if (isLoggedin) {
      return (
        <Router>
          <div>
            <Route exact path="/" component={listView} />
            <Route path="/edit/:id" component={editView} />
            <Route path="/new/:type" component={newView} />
            <Route path="/browse/:filter" component={listView} />
            <Menu content />
          </div>
        </Router>
      )
    } else if (isPending) {
      return (
        <div style={styles.loader}>
          <CircularProgress />
        </div>
      )
    } else {
      return (
        <div>
          <Login props={{ name, password }} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, match) => {
  return {
    loginState: Reducers.getAuthenticationStatus(state.sensenet),
    store: state,
  }
}

const userLogin = Actions.userLogin
const update = Actions.updateContent
const create = Actions.createContent

export default (connect(
  mapStateToProps,
  {
    loginClick: userLogin,
    editSubmitClick: update,
    createSubmitClick: create,
  })(App as any))
