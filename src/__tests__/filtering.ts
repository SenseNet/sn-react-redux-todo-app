import { combineReducers, createStore } from 'redux';
import { Content, ContentTypes, Repository, Mocks } from 'sn-client-js';
import { Reducers, Actions } from 'sn-redux';
import { createList, listByFilter, getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers/filtering'
import * as Chai from 'chai';
const expect = Chai.expect;

describe('#filtering', () => {
    let state: any;
    let sensenet, myReducer, store;
    let repo: Mocks.MockRepository = new Mocks.MockRepository();
    beforeEach(() => {
        state = {
            sensenet: {
                children: {
                    entities: {
                        5145: {
                            DisplayName: "Duis commodo nunc",
                            Id: 5145,
                            Status: ["active"],
                            Type: "Task"
                        },
                        5146: {
                            DisplayName: "Maecenas nec pulvinar",
                            Id: 5146,
                            Status: ["active"],
                            Type: "Task"
                        },
                        5147: {
                            DisplayName: "Nulla pharetra",
                            Id: 5147,
                            Status: ["active"],
                            Type: "Task"
                        }
                    },
                    error: null,
                    ids: [5145, 5146, 5147],
                    isFetching: false
                }
            },
            listByFilter: {
                Active: {
                    ids: [5145, 5146, 5147],
                    errorMessage: null,
                    isFetching: false
                },
                All: {
                    ids: [5145, 5146, 5147],
                    errorMessage: null,
                    isFetching: false
                },
                Completed: {
                    ids: [],
                    errorMessage: null,
                    isFetching: false
                }
            }
        }
        sensenet = Reducers.sensenet;
        myReducer = combineReducers({
            sensenet,
            listByFilter
        });
        store = createStore(
            myReducer,
            state
        );
    })

    describe('#getVisibleTodos', () => {
        const task = {
            DisplayName: "Duis commodo nunc",
            Id: 5145,
            Status: ["active"],
            Type: "Task"
        }
        it('should return the states first item by all filter', () => {
            expect(getVisibleTodos(state, 'All')[0]).to.be.deep.equal(task)
        });
        it('should return the states first item by active filter', () => {
            expect(getVisibleTodos(state, 'Active')[0]).to.be.deep.equal(task)
        });
        it('should return an empty array with completed filter', () => {
            expect(getVisibleTodos(state, 'Completed')).to.be.deep.equal([])
        });
    });
    describe('#getIsFetching reducer', () => {
        it('should return the initial state', () => {
            expect(getIsFetching(state, 'All')).to.be.eq(false);
        });
    });
    describe('#getErrorMessage reducer', () => {
        it('should return the initial state', () => {
            expect(getErrorMessage(state, 'All')).to.be.eq(undefined);
        });
    });
    describe('#errorMessage', () => {
        it('should return the given errorMessage', () => {
            store.dispatch(Actions.ReceiveContentFailure('all', { message: 'error happened' }));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq('error happened');
        });
        it('should return null', () => {
            store.dispatch(Actions.RequestContent('/workspaces', {}));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq(null);
        });
        it('should return null', () => {
            store.dispatch(Actions.ReceiveContent([], 'all'));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq(null);
        });
    });
    describe('#ids', () => {
        let content;
        let repo: Mocks.MockRepository = new Mocks.MockRepository();
        it('should return increment the length of the ids array', () => {
            content = repo.CreateContent({ DisplayName: 'My content', Id: 123 }, ContentTypes.Task);
            store.dispatch(Actions.CreateContentSuccess(content));
            let s = store.getState();
            expect(s["listByFilter"]['Active']['ids'].length).to.be.deep.equal(4);
        });
        it('should return the changed array', () => {
            store.dispatch(Actions.DeleteSuccess(1, 5146));
            let s = store.getState();
            expect(s["listByFilter"]['All']['ids'].length).to.be.deep.equal(2);
        });
    });
})
