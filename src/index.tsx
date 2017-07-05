import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import 'rxjs';
import { Root } from './components/Root'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { combineReducers } from 'redux';
import { Store, Reducers, Actions } from 'sn-redux';
import { Repository } from 'sn-client-js';
import { listByFilter } from './reducers/filtering';

const collection = Reducers.collection;
const myReducer = combineReducers({
  collection,
  listByFilter
});

const repository = new Repository.SnRepository({
  RepositoryUrl: 'https://sn-services/'
});

const store = Store.configureStore(myReducer, null, null, {}, repository);

store.dispatch(Actions.CheckLoginState());

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
