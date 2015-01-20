import Dispatcher from "../core/Dispatcher";
import { Observable } from "rx";
import { TodoApp } from "../components";

import {
    observeState,
    updateInputValue
} from "../services/StateService";

import {
    observeTodos,
    checkTodo,
    createTodo,
    editingTodo,
    removeTodo,
    updateTodo
} from "../services/TodoService";

var dispatcher = new Dispatcher();

var render = function(todos, state) {
    React.withContext({ dispatcher: dispatcher }, function() {
        React.render(
            <TodoApp
                title="todos"
                todos={todos}
                inputValue={state.inputValue}
                viewFilter={state.viewFilter}
            />,
            document.querySelector("#todoapp")
        );
    });
};

var toArray = function() {
    return Array.of(...arguments);
};

export default function() {
    dispatcher.of("todos", "create")
        .forEach(action => {
            createTodo(action.value);
            updateInputValue("");
        });

    dispatcher.of("todos", "check")
        .forEach(action => checkTodo(...action.value));

    dispatcher.of("todos", "editing")
        .forEach(action => editingTodo(...action.value));

    dispatcher.of("todos", "update")
        .forEach(action => updateTodo(...action.value));

    dispatcher.of("todos", "remove")
        .forEach(action => removeTodo(action.value));

    dispatcher.of("todos", "input")
        .forEach(action => updateInputValue(action.value));

    Observable.combineLatest(
        observeTodos(),
        observeState(),
        toArray
    ).forEach(args => render(...args));
}
