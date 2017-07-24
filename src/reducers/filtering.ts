import { combineReducers } from 'redux';
import { Reducers } from 'sn-redux';

export const createList = (filter) => {
  const handleToggle = (state, action, filter) => {
    const { result: toggleId, entities } = action.response;
    const { Status } = entities.collection[toggleId];
    const shouldRemove = (
      (Status.indexOf('Active') === - 1 && filter === 'active') ||
      (Status.indexOf('Completed') === - 1 && filter === 'completed')
    );
    return shouldRemove ?
      state.filter(Id => Id !== toggleId) :
      state;
  }
  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_CONTENT_SUCCESS':
        return action.response.result;
      case 'CREATE_CONTENT_SUCCESS':
        return [...state, action.response.result];
      case 'UPDATE_CONTENT_SUCCESS':
        return handleToggle(state, action, filter)
      case 'DELETE_CONTENT_SUCCESS':
        return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
      default:
        return state;
    }
  }
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
  }

  const errorMessage = (state: any = null, action: any) => {
    switch (action.type) {
      case 'FETCH_CONTENT_FAILURE':
        return action.message;
      case 'FETCH_CONTENT_REQUEST':
      case 'FETCH_CONTENT_SUCCESS':
        return null;
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};


const visibilityFilter = (state = 'All', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export const listByFilter = combineReducers({
  All: createList('all'),
  Active: createList('active'),
  Completed: createList('completed'),
  VisibilityFilter: visibilityFilter
})

export const getVisibleTodos = (state, filter) => {
  const ids = Reducers.getIds(state.listByFilter[filter])
  return ids.map(Id => Reducers.getContent(state.collection.byId, Id));
}

export const getIsFetching = (state, filter) =>
  Reducers.getFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  Reducers.getError(state.listByFilter[filter]);

export const getVisibilityFilter = (state) =>
  state.collection.filter;

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}