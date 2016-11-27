import React from "react";
import TodoItem from "./TodoItem";

export default class TodoList extends React.Component {

    getItems() {
        if (this.props.todos) {
            return this.props.todos.filter(
                (item) => {
                    if(this.props.filter === 'all' ) {
                        return true;
                    }
                    if(!item.get('isCompleted') && this.props.filter === 'active'){
                        return true;
                    }
                    if(item.get('isCompleted') && this.props.filter !== 'active') {
                        return true;
                    }
                    return false;
                }
            );
        }
        return [];
    }

    render() {
        return <section className="main">
            <ul className="todo-list">
                {this.getItems().map(item =>
                    <TodoItem key={item.get('id')}
                              title={item.get('title')}
                              id={item.get('id')}
                              isCompleted={item.get('isCompleted')}
                              isEditing={item.get('editing')}
                              doneEditing={this.props.doneEditing}
                              cancelEditing={this.props.cancelEditing}
                              toggleComplete={this.props.toggleComplete}
                              deleteItem={this.props.deleteItem}
                              editItem={this.props.editItem}/>
                )}
            </ul>
        </section>
    }
};