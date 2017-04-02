ko.bindingHandlers["snapTo"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        if (ko.isObservable(config)) {
            config.subscribe(function (newConfig) {
                element["snapClass"] = null;
                if (newConfig === "top") {
                    element["snapClass"] = "snap-to-top";
                }
                if (newConfig === "bottom") {
                    element["snapClass"] = "snap-to-bottom";
                }
            });
        }
        var updatePosition = function () {
            var snapClass = element["snapClass"];
            if (!snapClass) {
                return;
            }
            if (element.classList.contains(snapClass)) {
                if (element["snapScrollY"] >= window.scrollY) {
                    element.classList.remove("snap");
                    element.classList.remove(snapClass);
                    document.body.style.paddingTop = "0";
                }
            }
            else {
                var rect = element.getBoundingClientRect();
                if (rect.top <= 1) {
                    element["snapScrollY"] = window.scrollY;
                    element.classList.add("snap");
                    element.classList.add(snapClass);
                    document.body.style.paddingTop = rect.height + "px";
                }
            }
        };
        updatePosition();
        document.addEventListener("scroll", updatePosition);
    }
};
