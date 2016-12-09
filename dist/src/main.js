"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
require("rxjs");
const redux_1 = require("redux");
const sn_redux_1 = require("sn-redux");
const Root_1 = require("./components/Root");
const sn_client_js_1 = require("sn-client-js");
const filtering_1 = require("./reducers/filtering");
sn_client_js_1.SetSiteUrl('https://daily.demo.sensenet.com');
const collection = sn_redux_1.Reducers.collection;
const myReducer = redux_1.combineReducers({
    collection,
    listByFilter: filtering_1.listByFilter
});
const store = sn_redux_1.Store.configureStore(myReducer);
ReactDOM.render(React.createElement(Root_1.Root, { store: store }), document.getElementById('root'));

//# sourceMappingURL=main.js.map
