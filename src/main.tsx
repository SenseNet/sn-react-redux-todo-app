import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'rxjs';
import { combineReducers } from 'redux';
import { Store, Reducers } from 'sn-redux';
import { Root } from './components/Root'
import { Collection, ODataApi, SetSiteUrl } from 'sn-client-js';
import { listByFilter } from './reducers/filtering'

SetSiteUrl('https://demo06.demo.sensenet.com');

const collection = Reducers.collection;
const myReducer = combineReducers({
  collection,
  listByFilter
});

const store = Store.configureStore(myReducer);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

