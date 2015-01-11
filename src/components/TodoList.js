import React from "react";
import { PropTypes } from "react";
import TodoItem from "./TodoItem";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoList",

    propTypes: {
        todos: PropTypes.array.isRequired
    },

    getDefaultProps() {
        return {
            todos: []
        };
    },

    renderTodoItems() {
        return this.props.todos
            .map((todo, i) => <TodoItem key={i} todo={todo} />);
    },

    render() {
        return (
            <ul id="todo-list">
                {this.renderTodoItems()}
            </ul>
        );
    }
});
