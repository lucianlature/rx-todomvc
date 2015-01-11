import DispatcherMixin from "../mixins/DispatcherMixin";
import React from "react/addons";
import { PropTypes } from "react";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoItem",

    mixins: [
        DispatcherMixin
    ],

    propTypes: {
        todo: PropTypes.shape({
            value: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            editing: PropTypes.bool.isRequired
        }).isRequired
    },

    handleRemove() {
        this.context.dispatcher
            .dispatch("todos", "remove", this.props.todo);
    },

    handleToggle() {
        this.context.dispatcher
            .dispatch("todos", "toggle",
                [this.props.todo, !this.props.todo.completed]);
    },

    render() {
        var todo = this.props.todo;

        var className = React.addons.classSet({
            completed: todo.completed,
            editing: todo.editing
        });

        return (
            <li className={className}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={todo.completed}
                        onChange={this.handleToggle}
                    />

                    <label>{todo.value}</label>

                    <button
                        className="destroy"
                        onClick={this.handleRemove}
                    />
                </div>
            </li>
        );
    }
});
