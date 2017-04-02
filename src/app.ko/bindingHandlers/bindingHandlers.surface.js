ko.bindingHandlers["surface"] = {
    init: function (element, valueAccessor) {
        ko.applyBindingsToNode(element, {
            dragsource: {
                sticky: false,
                payload: "surface",
                preventDragging: function (clickedElement) {
                    return $(clickedElement).closest("a, .vienna-form, .vienna-toolbox-button, .vienna-toolbox-dropdown").length > 0;
                }
            }
        });
    }
};
