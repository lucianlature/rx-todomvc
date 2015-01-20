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

export default function() {
    Observable.combineLatest(
        observeTodos(),
        observeState(),
        toArray
    ).forEach(args => render(...args));
}
