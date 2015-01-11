import Dispatcher from "../core/Dispatcher";
import { PropTypes } from "react";

export default {
    contextTypes: {
        dispatcher: PropTypes.instanceOf(Dispatcher)
    }
};
