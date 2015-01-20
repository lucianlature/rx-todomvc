import ActionsMixin from "../mixins/ActionsMixin";
import React from "react/addons";
import { PropTypes } from "react";

/** @return {Boolean} */
var isEmpty = str => /^\s*$/.test(str);

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoInput",

    mixins: [
        ActionsMixin,
        React.addons.PureRenderMixin
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
        this.context.actions
            .updateInputValue(evt.target.value);
    },

    handleKeyDown(evt) {
        if (evt.key === "Enter" && !isEmpty(this.props.value)) {
            this.context.actions
                .createTodo(this.props.value);

            this.context.actions
                .updateInputValue("");
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
