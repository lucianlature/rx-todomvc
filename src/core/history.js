import { Observable } from "rx";

export const ROOT_URL = "/";

/**
 * @param {String} hash
 * @return {String}
 */
var trim = hash => hash.replace(/^#/, "");

var hashChange =
    Observable.fromEvent(window, "hashchange")
        .map(evt => trim(location.hash))
        .startWith(trim(location.hash) || "/");

export var observe = function() {
    return hashChange;
};
