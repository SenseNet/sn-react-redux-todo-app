import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Root } from './components/Root'
import './index.css'

import { Repository } from '@sensenet/client-core'
import { Reducers, Store } from '@sensenet/redux'
import { combineReducers } from 'redux'
import { listByFilter } from './reducers/filtering'

const sensenet = Reducers.sensenet
const myReducer = combineReducers({
  sensenet,
  listByFilter,
})

const repository = new Repository({
  repositoryUrl: 'https://dmsservice.demo.sensenet.com',
})

const options = {
  rootReducer: myReducer,
  repository,
} as Store.CreateStoreOptions
const store = Store.createSensenetStore(options)

ReactDOM.render(
  <Root store={store} repository={repository} />,
  document.getElementById('root') as HTMLElement,
)
