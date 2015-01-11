import Dispatcher from "../core/Dispatcher";
import { Observable } from "rx";
import { observeState, updateInputValue } from "../services/StateService";
import { observeTodos, createTodo, removeTodo, toggleTodo } from "../services/TodoService";
import { TodoApp } from "../components";

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

    dispatcher.of("todos", "remove")
        .forEach(action => removeTodo(action.value));

    dispatcher.of("todos", "toggle")
        .forEach(action => toggleTodo(...action.value));

    dispatcher.of("todos", "input")
        .forEach(action => updateInputValue(action.value));

    Observable.combineLatest(
        observeTodos(),
        observeState(),
        toArray
    ).forEach(args => render(...args));
}
