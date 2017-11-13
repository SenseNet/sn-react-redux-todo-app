import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/Root'
import 'rxjs'
import './index.css';

import { combineReducers } from 'redux';
import { Store, Reducers, Actions } from 'sn-redux';
import { Repository } from 'sn-client-js';
import { listByFilter } from './reducers/filtering';

const sensenet = Reducers.sensenet;
const myReducer = combineReducers({
  sensenet,
  listByFilter
});

const repository = new Repository.SnRepository({
  RepositoryUrl: 'https://dmsservice.demo.sensenet.com'
});


const store = Store.configureStore(myReducer, null, null, {}, repository)
store.dispatch(Actions.InitSensenetStore('/Root/Sites/Default_Site/tasks', { select: 'all', filter: "isof('Task')" }))

ReactDOM.render(
  <Root store={store} repository={repository} />,
  document.getElementById('root') as HTMLElement
);