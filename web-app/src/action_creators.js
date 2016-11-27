export function toggleComplete(todo) {
    todo = Object.assign({}, todo, {isCompleted: !todo.isCompleted});
    return {
        type: 'TOGGLE_COMPLETE',
        payload: {
            request: {
                url: '/todo',
                method: 'patch',
                data: todo
            }
        }
    }
}

export function changeFilter(filter) {
    return {
        type: 'CHANGE_FILTER',
        filter
    }
}

export function deleteItem(itemId) {
    return {
        type: 'DELETE_ITEM',
        payload: {
            request: {
                url: '/todo/' + itemId,
                method: 'delete'
            }
        }
    }
}

export function addItem(text) {
    return {
        type: 'ADD_ITEM',
        payload: {
            request: {
                url: '/todo',
                method: 'post',
                data: {
                    title: text
                }
            }
        }
    }
}

export function clearCompleted() {
    return {
        type: 'CLEAR_COMPLETED',
        payload: {
            request: {
                url: '/todo/clear_completed',
                method: 'post'
            }
        }
    }
}

export function editItem(itemId) {
    return {
        type: 'EDIT_ITEM',
        itemId
    }
}

export function cancelEditing(itemId) {
    return {
        type: 'CANCEL_EDITING',
        itemId
    }
}

export function doneEditing(itemId, newText) {
    return {
        type: 'DONE_EDITING',
        itemId,
        newText
    }
}