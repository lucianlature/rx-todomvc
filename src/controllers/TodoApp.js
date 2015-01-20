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

const DEBOUNCE_INTERVAL = 1000 / 60;

var context = {
    actions: {
        checkTodo,
        createTodo,
        editingTodo,
        removeTodo,
        updateTodo,
        updateInputValue
    }
};

var render = function(todos, state) {
    React.withContext(context, function() {
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

export default function(router) {
    var source = Observable.combineLatest(
        observeTodos(),
        observeState(),
        toArray
    );

    source
        .debounce(DEBOUNCE_INTERVAL)
        .takeUntil(router)
        .forEach(args => render(...args));
}
