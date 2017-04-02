"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DraggablesBindingHandler = (function () {
    function DraggablesBindingHandler(dragManager) {
        ko.bindingHandlers["dragsource"] = {
            init: function (element, valueAccessor) {
                var config = valueAccessor();
                dragManager.registerDragSource(element, config);
            }
        };
        ko.bindingHandlers["dragtarget"] = {
            init: function (element, valueAccessor) {
                var config = valueAccessor();
                dragManager.registerDragTarget(element, config);
            }
        };
    }
    return DraggablesBindingHandler;
}());
exports.DraggablesBindingHandler = DraggablesBindingHandler;
