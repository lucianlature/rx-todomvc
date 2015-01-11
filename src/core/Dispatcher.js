import { Subject } from "rx";
import history from "./history";

export default class Dispatcher extends Subject {
    /**
     * @param {String} target
     * @param {String} [type]
     * @return {Rx.Observable}
     */
    of(target, type) {
        return this.share()
            .takeUntil(history.observe().skip(1))
            .filter(item => item.target === target)
            .filter(item => type === undefined || item.type === type);
    }

    /**
     * @param {String} target
     * @param {String} type
     * @param {*} value
     */
    dispatch(target, type, value) {
        this.onNext(
            { target, type, value }
        );
    }
}
