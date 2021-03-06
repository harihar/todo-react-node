import {List, Map, fromJS} from "immutable";
import {expect} from "chai";
import reducer from "../src/reducer";

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                todos: List.of(
                    Map({id: 1, title: 'React', isCompleted: false}),
                    Map({id: 2, title: 'Redux', isCompleted: false}),
                    Map({id: 3, title: 'Immutable', isCompleted: true})
                )
            })
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                todos: [
                    {id: 1, title: 'React', isCompleted: false},
                    {id: 2, title: 'Redux', isCompleted: false},
                    {id: 3, title: 'Immutable', isCompleted: true}
                ]
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                todos: [
                    {id: 1, title: 'React', isCompleted: false},
                    {id: 2, title: 'Redux', isCompleted: false},
                    {id: 3, title: 'Immutable', isCompleted: true}
                ]
            }
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            filter: 'all',
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        }));
    });

    it('handles TOGGLE_COMPLETE_SUCCESS by changing the status from active to completed', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        });
        const action = {
            type: 'TOGGLE_COMPLETE_SUCCESS',
            payload: {
                data: {
                    id: 1,
                    title: 'React',
                    isCompleted: true
                }
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: true, editing: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        }));
    });

    it('handles TOGGLE_COMPLETE_SUCCESS by changing the status from completed to active', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: true}
            ]
        });
        const action = {
            type: 'TOGGLE_COMPLETE_SUCCESS',
            payload: {
                data: {
                    id: 3,
                    title: 'Immutable',
                    isCompleted: false
                }
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: false},
                {id: 3, title: 'Immutable', isCompleted: false, editing: false}
            ]
        }));
    });

    it('handles CHANGE_FILTER by changing the filter', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
            ],
            filter: 'all'
        });
        const action = {
            type: 'CHANGE_FILTER',
            filter: 'active'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
            ],
            filter: 'active'
        }));
    });

    it('handles DELETE_ITEM_SUCCESS by deleting the item from the todo item list', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'Redux', isCompleted: true}
            ],
            filter: 'all'
        });

        const action = {
            type: 'DELETE_ITEM_SUCCESS',
            payload: {
                data: {
                    id: 2
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
            ],
            filter: 'all'
        }))
    });

    it('handles ADD_ITEM_SUCCESS by adding the item to the todo item list', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'JS', isCompleted: true}
            ],
            filter: 'all'
        });

        const action = {
            type: 'ADD_ITEM_SUCCESS',
            payload: {
                data: {
                    id: 3,
                    title: 'Redux',
                    isCompleted: false
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'JS', isCompleted: true},
                {id: 3, title: 'Redux', isCompleted: false, editing: false}
            ],
            filter: 'all'
        }))
    });

    it('handles CLEAR_COMPLETED_SUCCESS by removing all completed items from the todo item list', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false},
                {id: 2, title: 'JS', isCompleted: true},
                {id: 3, title: 'Android', isCompleted: true}
            ],
            filter: 'all'
        });

        const action = {
            type: 'CLEAR_COMPLETED_SUCCESS',
            payload: {
                data: {
                    idList: [2, 3]
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false}
            ],
            filter: 'all'
        }))
    });

    it('handles EDIT_ITEM by changing the editing status to true', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: false},
            ],
            filter: 'all'
        });

        const action = {
            type: 'EDIT_ITEM',
            itemId: 1
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: true}
            ],
            filter: 'all'
        }))
    });

    it('handles DONE_EDITING by saving the new text and setting editing to false', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, title: 'React', isCompleted: false, editing: true}
            ],
            filter: 'all'
        });

        const action = {
            type: 'DONE_EDITING',
            itemId: 1,
            newText: 'Redux'
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, title: 'Redux', isCompleted: false, editing: false}
            ],
            filter: 'all'
        }))
    });

    it('handles CANCEL_EDITING by discarding the new text and setting editing to false and resetting the text', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: true},
            ],
            filter: 'all'
        });

        const action = {
            type: 'CANCEL_EDITING',
            itemId: 1
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: false}
            ],
            filter: 'all'
        }))
    });

    it('handles LOAD_SUCCESS by setting the todos list to the new todos list in the state', () => {
        const initialState = fromJS({
            todos: [],
            filter: 'all'
        });

        const action = {
            type: 'LOAD_SUCCESS',
            payload: {
                data: [
                    {id: 1, title: 'React', isCompleted: false},
                    {id: 2, title: 'Redux', isCompleted: false},
                    {id: 3, title: 'Immutable', isCompleted: true}
                ]
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS(
            {
                todos: [
                    {id: 1, title: 'React', isCompleted: false, editing: false},
                    {id: 2, title: 'Redux', isCompleted: false, editing: false},
                    {id: 3, title: 'Immutable', isCompleted: true, editing: false}
                ],
                filter: 'all'
            }
        ));
    });

});
