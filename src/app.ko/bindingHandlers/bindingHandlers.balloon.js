"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var balloonActiveClassName = "vienna-balloon-is-active";
ko.bindingHandlers["balloon"] = {
    init: function (triggerElement, valueAccessor) {
        var options = ko.unwrap(valueAccessor());
        var balloonX;
        var balloonY;
        var reposition = function (targetElement) {
            var targetRect = triggerElement.getBoundingClientRect();
            var balloonRect = targetElement.getBoundingClientRect();
            var position = options.position;
            switch (options.position) {
                case "top":
                    balloonY = targetRect.top;
                    if ((balloonY - balloonRect.height) < 0) {
                        position = "bottom";
                    }
                    break;
                case "bottom":
                    balloonY = targetRect.top + targetRect.height;
                    if (balloonY + balloonRect.height > window.innerHeight) {
                        position = "top";
                    }
                    break;
            }
            targetElement.classList.remove("vienna-balloon-top");
            targetElement.classList.remove("vienna-balloon-bottom");
            switch (position) {
                case "top":
                    balloonY = targetRect.top - balloonRect.height;
                    balloonX = targetRect.left + (targetRect.width / 2);
                    targetElement.classList.add("vienna-balloon-top");
                    break;
                case "bottom":
                    balloonY = targetRect.top + targetRect.height;
                    balloonX = targetRect.left + (targetRect.width / 2);
                    targetElement.classList.add("vienna-balloon-bottom");
                    break;
            }
            targetElement.style.top = balloonY + "px";
            targetElement.style.left = balloonX + "px";
        };
        var watch = function () { };
        var documentObserver = new MutationObserver(watch);
        triggerElement.addEventListener("click", function (event) {
            event.preventDefault();
            var targetElement = document.querySelector(options.target);
            if (!targetElement) {
                throw "Could not find target for balloon.";
            }
            if (targetElement.classList.contains(balloonActiveClassName)) {
                targetElement.classList.remove(balloonActiveClassName);
                documentObserver.disconnect();
            }
            else {
                targetElement.classList.add(balloonActiveClassName);
                reposition(targetElement);
                watch = function () {
                    reposition(targetElement);
                };
                documentObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
            }
        });
        document.addEventListener("scroll", function (event) {
            var targetElement = document.querySelector(options.target);
            if (!targetElement) {
                return;
            }
            reposition(targetElement);
        });
        document.addEventListener("mousedown", function (event) {
            var targetElement = document.querySelector(options.target);
            if (!targetElement) {
                return;
            }
            var it = $(event.target).closest(targetElement);
            var that = $(event.target).closest(triggerElement);
            if (it.length === 0 && that.length === 0) {
                if (targetElement) {
                    targetElement.classList.remove(balloonActiveClassName);
                }
                documentObserver.disconnect();
                if (options.isOpen) {
                    options.isOpen(false);
                }
            }
        }, true);
    }
};
