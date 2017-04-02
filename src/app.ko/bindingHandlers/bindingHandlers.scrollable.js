ko.bindingHandlers["scrollable"] = {
    init: function (element, valueAccessor) {
        var $element = $(element);
        $element.niceScroll({
            cursorcolor: "rgba(0,0,0,.2)",
            cursorborder: "none"
        });
    }
};
