"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ko.bindingHandlers["slate"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        var htmlEditor = ko.unwrap(config.htmlEditor);
        var stateObservable = config.state;
        htmlEditor.renderToContainer(element);
        htmlEditor.disable();
        stateObservable.subscribe(function (state) {
            htmlEditor.updateState(state);
        });
    }
};
