import DispatcherMixin from "../mixins/DispatcherMixin";
import React from "react";
import { PropTypes } from "react";

/** @return {Boolean} */
var isEmpty = str => /^\s*$/.test(str);

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoInput",

    mixins: [
        DispatcherMixin
    ],

    propTypes: {
        value: PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            value: ""
        };
    },

    handleChange(evt) {
        this.context.dispatcher
            .dispatch("todos", "input", evt.target.value);
    },

    handleKeyDown(evt) {
        if (evt.key === "Enter" && !isEmpty(this.props.value)) {
            this.context.dispatcher
                .dispatch("todos", "create", this.props.value);
        }
    },

    render() {
        return (
            <input
                id="new-todo"
                type="text"
                placeholder="What needs to be done?"
                value={this.props.value}
                autoFocus={true}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
});
