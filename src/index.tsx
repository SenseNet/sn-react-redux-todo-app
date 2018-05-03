import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Root } from './components/Root'
import './index.css'

import { JwtService } from '@sensenet/authentication-jwt'
import { Repository } from '@sensenet/client-core'
import { Reducers, Store } from '@sensenet/redux'
import { combineReducers } from 'redux'
import { listByFilter } from './reducers/filtering'

import lightBlue from 'material-ui/colors/lightBlue'
import pink from 'material-ui/colors/pink'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
  },
})

const sensenet = Reducers.sensenet
const myReducer = combineReducers({
  sensenet,
  listByFilter,
})

const repository = new Repository({
  repositoryUrl: 'https://dmsservice.demo.sensenet.com',
})

// tslint:disable-next-line:variable-name
const _jwtService = new JwtService(repository)

const options = {
  rootReducer: myReducer,
  repository,
} as Store.CreateStoreOptions
const store = Store.createSensenetStore(options)

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <Root store={store} repository={repository} />
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement,
)
