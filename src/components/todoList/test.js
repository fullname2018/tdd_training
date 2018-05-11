/* global describe, it, expect */

import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '.';

describe('TodoList компонент', () => {
    const deleteMock = jest.fn();
    const props = {
        todos: [
            {
                id: 1,
                text: 'A todo',
                hours: 16,
                minutes: 16,
                day: 16,
                month: 12,
                year: 2020
            },
        ],
        deleteTodo: deleteMock,
    };

    const component = shallow(<TodoList {...props} />);

    it('Рендер успешно завершен', () => {
        expect(component.exists()).toEqual(true);
    });

    it('Должно отображаться задание прокинутое из пропсов', () => {
        expect(component.find('.todo-text').text()).toEqual(props.todos[0].text);
    });

    it('При нажатии должен осушествляться вызов функции deleteTodo', () => {
        expect(deleteMock.mock.calls.length).toEqual(0);
        component.find('.todo-delete').simulate('click');
        expect(deleteMock.mock.calls.length).toEqual(1);
    });

});