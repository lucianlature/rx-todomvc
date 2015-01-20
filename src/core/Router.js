import { BehaviorSubject } from "rx";
import history from "./history";

export const NOT_FOUND = "@@404";

export default class Router extends BehaviorSubject {
    constructor(routes) {
        super.constructor(history.ROOT_URL);
        this.routes = routes;
        history.observe().forEach(this);
    }

    start() {
        this.forEach(
            url => this.handle(url),
            err => console.log(err.stack)
        );
    }

    /**
     * @param {String} url
     */
    handle(url) {
        var method = this.routes[url] ||
            this.routes[NOT_FOUND];

        if (typeof method === "function") {
            method(this.skip(1));
        }
    }
}
