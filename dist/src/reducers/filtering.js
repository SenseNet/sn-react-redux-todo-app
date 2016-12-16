"use strict";
const redux_1 = require("redux");
const sn_redux_1 = require("sn-redux");
exports.createList = (filter) => {
    const handleToggle = (state, action, filter) => {
        const { result: toggleId, entities } = action.response;
        const { Status } = entities.collection[toggleId];
        const shouldRemove = ((Status.indexOf('Active') === -1 && filter === 'Active') ||
            (Status.indexOf('Completed') === -1 && filter === 'Completed'));
        return shouldRemove ?
            state.filter(Id => Id !== toggleId) :
            state;
    };
    const ids = (state = [], action) => {
        switch (action.type) {
            case 'FETCH_CONTENT_SUCCESS':
                return action.response.result;
            case 'CREATE_CONTENT_SUCCESS':
                return [...state, action.response.result];
            case 'UPDATE_CONTENT_SUCCESS':
                return handleToggle(state, action, filter);
            case 'DELETE_CONTENT_SUCCESS':
                return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
            default:
                return state;
        }
    };
    const isFetching = (state = false, action) => {
        switch (action.type) {
            case 'FETCH_CONTENT_REQUEST':
                return true;
            case 'FETCH_CONTENT_SUCCESS':
            case 'FETCH_CONTENT_FAILURE':
                return false;
            default:
                return state;
        }
    };
    const errorMessage = (state = null, action) => {
        switch (action.type) {
            case 'FETCH_CONTENT_FAILURE':
                return action.message;
            case 'FETCH_CONTENT_REQUEST':
            case 'FETCH_CONTENT_SUCCESS':
                return null;
            default:
                return state;
        }
    };
    return redux_1.combineReducers({
        ids,
        isFetching,
        errorMessage
    });
};
exports.listByFilter = redux_1.combineReducers({
    All: exports.createList('All'),
    Active: exports.createList('Active'),
    Completed: exports.createList('Completed')
});
exports.getVisibleTodos = (state, filter) => {
    const ids = sn_redux_1.Reducers.getIds(state.listByFilter[filter]);
    return ids.map(Id => sn_redux_1.Reducers.getContent(state.collection.byId, Id));
};
exports.getIsFetching = (state, filter) => sn_redux_1.Reducers.getFetching(state.listByFilter[filter]);
exports.getErrorMessage = (state, filter) => sn_redux_1.Reducers.getError(state.listByFilter[filter]);

//# sourceMappingURL=filtering.js.map
