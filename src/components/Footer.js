import { ALL, ACTIVE, COMPLETED } from "../const/FilterConst";
import ActionsMixin from "../mixins/ActionsMixin";
import React from "react/addons";
import { PropTypes } from "react";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "Footer",

    mixins: [
        ActionsMixin,
        React.addons.PureRenderMixin
    ],

    propTypes: {
        todos: PropTypes.array.isRequired
    },

    /** @return {Array} */
    getRemaining() {
        return this.props.todos
            .filter(todo => !todo.completed);
    },

    /** @return {Array} */
    getCompleted() {
        return this.props.todos
            .filter(todo => todo.completed);
    },

    handleClear() {
        this.getCompleted().forEach(todo => {
            this.context.actions
                .removeTodo(todo);
        });
    },

    renderClearButton() {
        var completed = this.getCompleted().length;

        if (completed > 0) {
            return (
                <button id="clear-completed" onClick={this.handleClear}>
                    Clear completed ({completed})
                </button>
            );
        }
    },

    renderFilters() {
        var viewFilter = this.props.viewFilter;

        var filters = [
            { filter: ALL, label: "All", path: "/" },
            { filter: ACTIVE, label: "Active", path: "/active" },
            { filter: COMPLETED, label: "Completed", path: "/completed" }
        ];

        return filters.map(props => {
            return (
                <li key={props.filter}>
                    <a className={viewFilter === props.filter ? "selected" : ""} href={`#${props.path}`}>
                        {props.label}
                    </a>
                </li>
            );
        });
    },

    render() {
        var remaining = this.getRemaining().length;
        var viewFilter = this.props.viewFilter;

        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{remaining}</strong> {remaining === 1 ? "item" : "items"} left
                </span>

                <ul id="filters">
                    {this.renderFilters()}
                </ul>

                {this.renderClearButton()}
            </footer>
        );
    }
});
