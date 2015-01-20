import { ALL, ACTIVE, COMPLETED } from "../const/FilterConst";
import DispatcherMixin from "../mixins/DispatcherMixin";
import React from "react/addons";
import { PropTypes } from "react";
import Footer from "./Footer";
import Header from "./Header";
import TodoList from "./TodoList";
import TodoToggle from "./TodoToggle";

/** @type {ReactElement} */
export default React.createClass({
    displayName: "TodoApp",

    mixins: [
        DispatcherMixin,
        React.addons.PureRenderMixin
    ],

    propTypes: {
        inputValue: PropTypes.string,
        title: PropTypes.string,
        todos: PropTypes.array.isRequired
    },

    getDefaultProps() {
        return {
            todos: []
        };
    },

    isSelectAll() {
        return this.props.todos.every(todo => todo.completed);
    },

    handleToggle() {
        this.props.todos.forEach(todo => {
            this.context.dispatcher
                .dispatch("todos", "check",
                    [todo, !this.isSelectAll()]);
        });
    },

    renderTodoToggle() {
        if (this.props.todos.length) {
            return (
                <TodoToggle
                    checked={this.isSelectAll()}
                    onChange={this.handleToggle}
                />
            );
        }
    },

    renderTodoList() {
        if (this.props.todos.length) {
            var viewFilter = this.props.viewFilter;

            var todos = this.props.todos.filter(todo => {
                return viewFilter === ALL ||
                    viewFilter === ACTIVE && !todo.completed ||
                    viewFilter === COMPLETED && todo.completed;
            });

            return <TodoList todos={todos} />;
        }
    },

    renderTodoFooter() {
        if (this.props.todos.length) {
            return (
                <Footer
                    todos={this.props.todos}
                    viewFilter={this.props.viewFilter}
                />
            );
        }
    },

    render() {
        return (
            <div>
                <Header
                    title={this.props.title}
                    inputValue={this.props.inputValue}
                />

                <section id="main">
                    {this.renderTodoToggle()}
                    {this.renderTodoList()}
                </section>

                {this.renderTodoFooter()}
            </div>
        );
    }
});
