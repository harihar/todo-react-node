import React from 'react';

export default class TodoHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter' && this.refs.addTodoInput.value !== '') {
      const value = this.refs.addTodoInput.value;
      this.refs.addTodoInput.value = '';
      return this.props.addItem(value);
    }
  }

  render() {
    return <header className="header">
      <h1>todos</h1>
      <input className="new-todo"
             ref="addTodoInput"
             autoFocus={true}
             autoComplete="off"
             placeholder="What needs to be done?"
             onKeyPress = {this._handleKeyPress.bind(this)} />
    </header>
  }
};