"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PromiseToDelayedComputed(promiseFactory, initialValue) {
    var observable = ko.observable(initialValue);
    var scheduled = true;
    var result = ko.pureComputed({
        read: function () {
            if (!scheduled) {
                promiseFactory().then(observable);
                scheduled = true;
            }
            return observable();
        }
    });
    scheduled = false;
    return result;
}
exports.PromiseToDelayedComputed = PromiseToDelayedComputed;
