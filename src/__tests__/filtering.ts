import { combineReducers, createStore } from 'redux';
import { Content, ContentTypes, Repository, Mocks } from 'sn-client-js';
import { Reducers, Actions } from 'sn-redux';
import { createList, listByFilter, getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers/filtering'
import * as Chai from 'chai';
const expect = Chai.expect;

describe('#filtering', () => {
    let state: any;
    let collection, myReducer, store;
    let repo: Mocks.MockRepository = new Mocks.MockRepository();
    beforeEach(() => {
        state = {
            entities: {
                contents: {
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
                errorMessage: null,
                ids: [5145, 5146, 5147],
                isFetching: false
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
        collection = Reducers.entities;
        myReducer = combineReducers({
            collection,
            listByFilter
        });
        store = createStore(
            myReducer,
            state
        );
    })

    // describe('#byId reducer with filtering', () => {
    //     it('should return the initial state', () => {
    //         expect(Reducers.entities(undefined, {})).to.be.deep.equal({});
    //     });
    //     it('should handle DELETE_CONTENT_SUCCESS', () => {
    //         const ids = [1, 2, 3];
    //         expect(Reducers.byId(ids, { type: 'DELETE_CONTENT_SUCCESS', id: 1 })).to.be.deep.equal({ 0: 1, 2: 3 });
    //     });
    //     it('should return a new state with the given response', () => {
    //         expect(Reducers.byId({}, { response: { entities: { collection: { a: 0, b: 2 } } } }))
    //             .to.be.deep.eq({ a: 0, b: 2 });
    //     });
    // });

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
            expect(getErrorMessage(state, 'All')).to.be.eq(null);
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
        let content
        it('should return increment the length of the ids array', () => {
            content = Content.Create({
                Path: '/Root/Sites/Default_Site/tasks',
                Status: 'active' as any
            }, ContentTypes.Task, repo)
            store.dispatch(Actions.CreateContentSuccess(content));
            let s = store.getState();
            expect(s["listByFilter"]['Active']['ids'].length).to.be.deep.equal(4);
        });
        it('should return the changed array', () => {
            content = Content.Create({
                Path: '/Root/Sites/Default_Site/tasks',
                Status: 'completed' as any
            }, ContentTypes.Task, repo)
            store.dispatch(Actions.UpdateContentSuccess(content));
            let s = store.getState();
            expect(s["listByFilter"]['Completed']['ids']).to.be.deep.equal([]);
        });
        it('should return the changed array', () => {
            store.dispatch(Actions.DeleteSuccess(1, 5146));
            let s = store.getState();
            expect(s["listByFilter"]['All']['ids'].length).to.be.deep.equal(2);
        });
    });
})