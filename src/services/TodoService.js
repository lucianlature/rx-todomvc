import { BehaviorSubject, Observable, Subject } from "rx";
import React from "react/addons";

/** @type {Function} */
var update = React.addons.update;

// Event types
const CREATE = 1;
const UPDATE = 2;
const REMOVE = 3;

var todoActions = new Subject();
var todoStore = new BehaviorSubject([]);

var handleCreate = function(value) {
    return update(todoStore.value, {
        $push: [value]
    });
};

var handleUpdate = function(value) {
    var state = todoStore.value;
    var idx = state.indexOf(value.current);
    return update(state, {
        [idx]: { $set: value.updated }
    });
};

var handleRemove = function(value) {
    var state = todoStore.value;
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
todoActions
    .filter(isCreate)
    .map(evt => handleCreate(evt.value))
    .forEach(todoStore);

// UPDATE
todoActions
    .filter(isUpdate)
    .map(evt => handleUpdate(evt.value))
    .forEach(todoStore);

// REMOVE
todoActions
    .filter(isRemove)
    .map(evt => handleRemove(evt.value))
    .forEach(todoStore);

/** @return {Observable} */
export var observeTodos = function() {
    return todoStore;
};

/**
* @param {Object} todo
* @param {Boolean} isCompleted
*/
export var checkTodo = function(todo, isCompleted) {
    var newTodo = update(todo, {
        completed: { $set: isCompleted }
    });

    todoActions.onNext({
        type: UPDATE,
        value: {
            current: todo,
            updated: newTodo
        }
    });
};

/** @param {String} value */
export var createTodo = function(value) {
    var todo = {
        value: value,
        createdAt: Date.now(),
        completed: false,
        editing: false
    };

    todoActions.onNext({
        type: CREATE,
        value: todo
    });
};

/**
 * @param {Object} todo
 * @param {Boolean} isEditing
 */
export var editingTodo = function(todo, isEditing) {
    var newTodo = update(todo, {
        editing: { $set: isEditing }
    });

    todoActions.onNext({
        type: UPDATE,
        value: {
            current: todo,
            updated: newTodo
        }
    });
};

/** @param {Object} todo */
export var removeTodo = function(todo) {
    todoActions.onNext({
        type: REMOVE,
        value: todo
    });
};

/**
 * @param {Object} todo
 * @param {String} value
 */
export var updateTodo = function(todo, value) {
    var newTodo = update(todo, {
        value: { $set: value }
    });

    todoActions.onNext({
        type: UPDATE,
        value: {
            current: todo,
            updated: newTodo
        }
    });
};
