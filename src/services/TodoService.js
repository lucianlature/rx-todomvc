import { BehaviorSubject, Observable, Subject } from "rx";
import React from "react/addons";

/** @type {Function} */
var update = React.addons.update;

// Event types
const CREATE = 1;
const UPDATE = 2;
const REMOVE = 3;

var todoEvents = new Subject();
var todoState = new BehaviorSubject([]);

var handleCreate = function(value) {
    return update(todoState.value, {
        $push: [value]
    });
};

var handleUpdate = function(value) {
    var state = todoState.value;
    var idx = state.indexOf(value.current);
    return update(state, {
        [idx]: { $set: value.updated }
    });
};

var handleRemove = function(value) {
    var state = todoState.value;
    var idx = state.indexOf(value);
    return update(state, {
        $splice: [[idx, 1]]
    });
};

/** @return {Boolean} */
var isOfType = (type, evt) => evt.type === type;

/** @return {Boolean} */
var isCreate = isOfType.bind(null, CREATE);

/** @return {Boolean} */
var isUpdate = isOfType.bind(null, UPDATE);

/** @return {Boolean} */
var isRemove = isOfType.bind(null, REMOVE);

// CREATE
todoEvents
    .filter(isCreate)
    .map(evt => handleCreate(evt.value))
    .forEach(todoState);

// UPDATE
todoEvents
    .filter(isUpdate)
    .map(evt => handleUpdate(evt.value))
    .forEach(todoState);

// REMOVE
todoEvents
    .filter(isRemove)
    .map(evt => handleRemove(evt.value))
    .forEach(todoState);

/** @return {Observable} */
export var observeTodos = function() {
    return todoState;
};

/** @param {String} value */
export var createTodo = function(value) {
    var todo = {
        value: value,
        createdAt: Date.now(),
        completed: false,
        editing: false
    };

    todoEvents.onNext({
        type: CREATE,
        value: todo
    });
};

/** @param {Object} todo */
export var removeTodo = function(todo) {
    todoEvents.onNext({
        type: REMOVE,
        value: todo
    });
};

/**
 * @param {Object} todo
 * @param {Boolean} isCompleted
 */
export var toggleTodo = function(todo, isCompleted) {
    var newTodo = update(todo, {
        completed: { $set: isCompleted }
    });

    todoEvents.onNext({
        type: UPDATE,
        value: {
            current: todo,
            updated: newTodo
        }
    });
};
