import {fromJS} from "immutable";

function setState(state, newState) {
    return state.merge(newState);
}

function toggleComplete(state, newItem) {
    const itemIndex = state.get('todos').findIndex(
        (item) => item.get('id') === newItem.id
    );

    newItem = fromJS(Object.assign({}, newItem, {editing: false}));
    return state.update("todos", todos => todos.set(itemIndex, newItem));
}

function changeFilter(state, filter) {
    return state.set('filter', filter);
}

function deleteItem(state, itemId) {
    const itemIndex = state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    );
    const updatedTodos = state.get('todos').delete(itemIndex);
    state = state.set('todos', updatedTodos);
    return state;
}

function addItem(state, todo) {
    const newItem = fromJS(Object.assign({}, todo, {editing: false}));
    const updatedTodos = state.get('todos').push(newItem);
    state = state.set('todos', updatedTodos);

    return state;
}

function clearCompleted(state, idList) {
    const updatedTodos = state.get('todos').filter((item) => {
        return idList.indexOf(item.get('id')) < 0;
    });

    return state.set('todos', updatedTodos);
}

function editItem(state, itemId) {
    const itemIndex = state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    );

    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', true);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function doneEditing(state, itemId, newText) {
    const itemIndex = state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    );

    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false)
        .set('title', newText);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function cancelEditing(state, itemId) {
    const itemIndex = state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    );

    const updatedItem = state.get('todos')
        .get(itemIndex)
        .set('editing', false);

    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function setNewDataReceivedFromServer(state, data) {
    console.log(data);
    data = data.map(todo => {
        return Object.assign({}, todo, {editing: false});
    });
    data = fromJS(data);
    return state.set('todos', data);
}

export default function (state = fromJS({todos: [], filter: 'all'}), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);

        case 'CHANGE_FILTER':
            return changeFilter(state, action.filter);

        case 'CLEAR_COMPLETED_SUCCESS':
            return clearCompleted(state, action.payload.data.idList);

        case 'EDIT_ITEM':
            return editItem(state, action.itemId);

        case 'DONE_EDITING':
            return doneEditing(state, action.itemId, action.newText);

        case 'CANCEL_EDITING':
            return cancelEditing(state, action.itemId);

        case 'LOAD_SUCCESS':
            return setNewDataReceivedFromServer(state, action.payload.data);

        case 'ADD_ITEM_SUCCESS':
            return addItem(state, action.payload.data);

        case 'TOGGLE_COMPLETE_SUCCESS':
            return toggleComplete(state, action.payload.data);

        case 'DELETE_ITEM_SUCCESS':
            return deleteItem(state, action.payload.data.id);
    }
    return state;
}