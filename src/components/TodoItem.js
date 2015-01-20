import ActionsMixin from "../mixins/ActionsMixin";
import React from "react/addons";
import { PropTypes } from "react";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoItem",

    mixins: [
        ActionsMixin,
        React.addons.PureRenderMixin
    ],

    propTypes: {
        todo: PropTypes.shape({
            value: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            editing: PropTypes.bool.isRequired
        }).isRequired
    },

    componentDidUpdate(prevProps) {
        // Workaround for how React handles updates
        // Input field focus should be applied after
        // render has completed.
        if (this.props.todo.editing && !prevProps.todo.editing) {
            var node = this.refs.input.getDOMNode();
            node.focus();
            node.setSelectionRange(
                node.value.length,
                node.value.length
            );
        }
    },

    handleUpdate(evt) {
        this.context.actions
            .updateTodo(this.props.todo, evt.target.value);
    },

    handleCheck() {
        this.context.actions
            .checkTodo(this.props.todo, !this.props.todo.completed);
    },

    handleStartEditing() {
        this.context.actions
            .editingTodo(this.props.todo, true);
    },

    handleStopEditing() {
        this.context.actions
            .editingTodo(this.props.todo, false);
    },

    handleKeyDown(evt) {
        if (evt.key === "Enter") {
            this.handleStopEditing();
        }
    },

    handleRemove() {
        this.context.actions
            .removeTodo(this.props.todo);
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
                        onChange={this.handleCheck}
                    />

                    <label onDoubleClick={this.handleStartEditing}>
                        {todo.value}
                    </label>

                    <button
                        className="destroy"
                        onClick={this.handleRemove}
                    />
                </div>

                <input
                    ref="input"
                    className="edit"
                    value={todo.value}
                    onChange={this.handleUpdate}
                    onBlur={this.handleStopEditing}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
});
