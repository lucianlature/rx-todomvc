import React from "react";
import { PropTypes } from "react";

var noop = () => {};

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoToggle",

    propTypes: {
        checked: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            checked: false,
            onChange: noop
        };
    },

    render() {
        return (
            <div>
                <input
                    id="toggle-all"
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />

                <label htmlFor="toggle-all">
                    Mark all as complete
                </label>
            </div>
        );
    }
});
