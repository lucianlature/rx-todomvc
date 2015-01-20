import { PropTypes } from "react";

export default {
    contextTypes: {
        actions: PropTypes.objectOf(
            PropTypes.func
        ).isRequired
    }
};
