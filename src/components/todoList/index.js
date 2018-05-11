import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notified: 'no'
        };
    }

    render() {
        const { todos, deleteTodo } = this.props;
        const todoItems = todos.map(todo => (

            < li className="task-box" key={todo.id} >

                <button
                    type="button"
                    className="task-box"
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete
          </button>

                <span id="notification" className="todo-text">
                    {todo.text}
                </span>
            </li >
        ));
        return (
            <ul>
                {todoItems}
            </ul>
        )
    }
};


TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        },
    )).isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
