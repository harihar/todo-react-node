import React from 'react';
import classNames from 'classnames';
import TextInput from './TextInput';

export default class TodoItem extends React.Component {

  render() {
    var itemClass = classNames({
      'todo': true,
      'completed': this.props.isCompleted,
      'editing': this.props.isEditing
    });

    return <li className={itemClass}>
      <div className="view">
        <input type="checkbox" 
          className="toggle" 
          defaultChecked={this.props.isCompleted}
          onClick={() => this.props.toggleComplete({id:this.props.id, title: this.props.title, isCompleted: this.props.isCompleted})}/>
        <label htmlFor="todo"
               ref="text"
               onDoubleClick={() => this.props.editItem(this.props.id)}>
          {this.props.title}
        </label>
        <button className="destroy"
                onClick={() => this.props.deleteItem(this.props.id)}></button>
      </div>
      <TextInput text={this.props.title}
                  itemId={this.props.id}
                  cancelEditing={this.props.cancelEditing}
                  doneEditing={this.props.doneEditing}/> 
    </li>
  }
};