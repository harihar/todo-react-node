import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoList from '../../src/components/TodoList';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

describe('TodoList', () => {
  it('renders a list with only the active items if the filter is active', () => {
    const todos = List.of(
      Map({id: 1, title: 'React', isCompleted: false}),
      Map({id: 2, title: 'Redux', isCompleted: false}),
      Map({id: 3, title: 'Immutable', isCompleted: true})
    );
    const filter = 'active';
    const component = renderIntoDocument(
      <TodoList filter={filter} todos={todos}/>
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(items.length).to.equal(2);
    expect(items[0].textContent).to.contain('React');
    expect(items[1].textContent).to.contain('Redux');
  });

  it('renders only todo items which have status completed if the filter is completed', () => {
    const todos = List.of(
      Map({id: 1, title: 'React', isCompleted: false}),
      Map({id: 2, title: 'Redux', isCompleted: false}),
      Map({id: 3, title: 'Immutable', isCompleted: true})
    );
    const filter = 'completed';
    const component = renderIntoDocument(
      <TodoList filter={filter} todos={todos} />
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(items.length).to.equal(1);
    expect(items[0].textContent).to.contain('Immutable');
  });

  it('renders all todo items', () => {
    const todos = List.of(
      Map({id: 1, title: 'React', isCompleted: false}),
      Map({id: 2, title: 'Redux', isCompleted: false}),
      Map({id: 3, title: 'Immutable', isCompleted: true})
    );
    const filter = 'all';
    const component = renderIntoDocument(
      <TodoList filter={filter} todos={todos} />
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(items.length).to.equal(3);
    expect(items[0].textContent).to.contain('React');
    expect(items[1].textContent).to.contain('Redux');
    expect(items[2].textContent).to.contain('Immutable');
  });
});