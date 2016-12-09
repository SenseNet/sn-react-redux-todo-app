"use strict";
const redux_1 = require("redux");
const sn_redux_1 = require("sn-redux");
const filtering_1 = require("../src/reducers/filtering");
const Chai = require("chai");
const expect = Chai.expect;
describe('#filtering', () => {
    let state;
    let collection, myReducer, store;
    beforeEach(() => {
        state = {
            collection: {
                byId: {
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
        };
        collection = sn_redux_1.Reducers.collection;
        myReducer = redux_1.combineReducers({
            collection,
            listByFilter: filtering_1.listByFilter
        });
        store = redux_1.createStore(myReducer, state);
    });
    describe('#byId reducer with filtering', () => {
        it('should return the initial state', () => {
            expect(sn_redux_1.Reducers.byId(undefined, {})).to.be.deep.equal({});
        });
        it('should handle DELETE_CONTENT_SUCCESS', () => {
            const ids = [1, 2, 3];
            expect(sn_redux_1.Reducers.byId(ids, { type: 'DELETE_CONTENT_SUCCESS', id: 1 })).to.be.deep.equal({ 0: 1, 2: 3 });
        });
        it('should return a new state with the given response', () => {
            expect(sn_redux_1.Reducers.byId({}, { response: { entities: { collection: { a: 0, b: 2 } } } }))
                .to.be.deep.eq({ a: 0, b: 2 });
        });
    });
    describe('#getVisibleTodos', () => {
        const task = {
            DisplayName: "Duis commodo nunc",
            Id: 5145,
            Status: ["active"],
            Type: "Task"
        };
        it('should return the states first item by all filter', () => {
            expect(filtering_1.getVisibleTodos(state, 'All')[0]).to.be.deep.equal(task);
        });
        it('should return the states first item by active filter', () => {
            expect(filtering_1.getVisibleTodos(state, 'Active')[0]).to.be.deep.equal(task);
        });
        it('should return an empty array with completed filter', () => {
            expect(filtering_1.getVisibleTodos(state, 'Completed')).to.be.deep.equal([]);
        });
    });
    describe('#getIsFetching reducer', () => {
        it('should return the initial state', () => {
            expect(filtering_1.getIsFetching(state, 'All')).to.be.eq(false);
        });
    });
    describe('#getErrorMessage reducer', () => {
        it('should return the initial state', () => {
            expect(filtering_1.getErrorMessage(state, 'All')).to.be.eq(null);
        });
    });
    describe('#errorMessage', () => {
        it('should return the given errorMessage', () => {
            store.dispatch(sn_redux_1.Actions.ReceiveContentFailure('All', { message: 'error happened' }));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq('error happened');
        });
        it('should return null', () => {
            store.dispatch(sn_redux_1.Actions.RequestContent('/workspaces', {}));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq(null);
        });
        it('should return null', () => {
            store.dispatch(sn_redux_1.Actions.ReceiveContent({ d: { results: [] } }, 'All'));
            let s = store.getState();
            expect(s["listByFilter"]['All'].errorMessage).to.be.eq(null);
        });
    });
    describe('#ids', () => {
        it('should return increment the length of the ids array', () => {
            store.dispatch(sn_redux_1.Actions.CreateContentSuccess({ response: { d: { Id: 1234 } } }));
            let s = store.getState();
            expect(s["listByFilter"]['All']['ids'].length).to.be.deep.equal(4);
        });
        it('should return the changed array', () => {
            store.dispatch(sn_redux_1.Actions.UpdateContentSuccess({ response: { d: { Id: 5145, Status: ["completed"] } } }));
            let s = store.getState();
            expect(s["listByFilter"]['Completed']['ids']).to.be.deep.equal([]);
        });
        it('should return the changed array', () => {
            store.dispatch(sn_redux_1.Actions.DeleteSuccess(1, 5146));
            let s = store.getState();
            expect(s["listByFilter"]['All']['ids'].length).to.be.deep.equal(2);
        });
    });
});

//# sourceMappingURL=filteringTests.js.map
