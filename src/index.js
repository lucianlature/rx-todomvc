import { Observable } from "rx";
import Router from "./core/Router";
import { TodoApp } from "./controllers";

import "todomvc-common/base.css";

var app = new Router({
    "/": TodoApp,
    "/active": TodoApp,
    "/completed": TodoApp
});

Observable.fromEvent(document, "DOMContentLoaded")
    .first()
    .forEach(
        () => app.start(),
        err => console.log(err.stack)
    );

export default app;
