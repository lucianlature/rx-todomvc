import { ALL, ACTIVE, COMPLETED } from "../const/FilterConst";
import { BehaviorSubject } from "rx";
import history from "../core/history";
import React from "react/addons";

/** @type {Function} */
var update = React.addons.update;

var stateStore = new BehaviorSubject({
    inputValue: "",
    viewFilter: ALL
});

/**
 * @param {String} route
 * @return {Object}
 */
var updateViewFilterForRoute = function(route) {
    var viewFilter;

    switch (route) {
        case "/":
            viewFilter = ALL;
            break;

        case "/active":
            viewFilter = ACTIVE;
            break;

        case "/completed":
            viewFilter = COMPLETED;
            break;
    }

    return update(stateStore.value, {
        viewFilter: { $set: viewFilter }
    });
};

history.observe()
    .map(updateViewFilterForRoute)
    .forEach(stateStore);

/** @return {Rx.Observable} */
export var observeState = function() {
    return stateStore;
};

/** @param {String} value */
export var updateInputValue = function(value) {
    stateStore.onNext(
        update(stateStore.value, {
            inputValue: { $set: value }
        })
    );
};
