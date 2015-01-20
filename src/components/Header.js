import React from "react/addons";
import { PropTypes } from "react";
import TodoInput from "./TodoInput";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "Header",

    mixins: [
        React.addons.PureRenderMixin
    ],

    propTypes: {
        title: PropTypes.string.isRequired,
        inputValue: PropTypes.string
    },

    render() {
        return (
            <header id="header">
                <h1>{this.props.title}</h1>
                <TodoInput
                    value={this.props.inputValue}
                />
            </header>
        );
    }
});
