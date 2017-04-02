"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tutorial = (function () {
    function Tutorial() {
        this.currentStepNum = 0;
        this.tutorialSteps = new Array();
        this.runCurrentStep = this.runCurrentStep.bind(this);
        this.completeStep = this.completeStep.bind(this);
        this.replaceArrow = this.replaceArrow.bind(this);
        this.onDocumentChange = this.onDocumentChange.bind(this);
        this.timestamp = new Date().getTime();
    }
    Tutorial.prototype.completeStep = function () {
        var currentStep = this.tutorialSteps[this.currentStepNum];
        var currentStepText = currentStep.arrowText;
        var elapsedTime = this.timestamp - (this.timestamp = new Date().getTime());
        dataLayer.push({
            'event': 'Tutorial',
            'category': 'Tutorial',
            'action': 'StepComplete',
            'label': currentStepText,
            'value': elapsedTime
        });
        $(this.arrowElement).remove();
        this.arrowElement = null;
        this.currentStepNum += 1;
        if (this.currentStepNum < this.tutorialSteps.length) {
            setTimeout(this.runCurrentStep, currentStep.stepCompleteDelay);
        }
    };
    Tutorial.prototype.getPageOffsetFor = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            top: top,
            left: left
        };
    };
    ;
    Tutorial.prototype.replaceArrow = function () {
        if (!this.arrowElement) {
            return;
        }
        var step = this.tutorialSteps[this.currentStepNum];
        var targetElement;
        var trackedElement;
        if (step.targetElementSearch) {
            targetElement = step.targetElementSearch();
        }
        if (step.trackedElementSearch) {
            trackedElement = step.trackedElementSearch();
        }
        if (targetElement === undefined || targetElement === null) {
            return;
        }
        if (!trackedElement) {
            trackedElement = targetElement;
        }
        if (targetElement === document.body) {
            this.arrowElement.classList.add("vienna-arrow-bottom");
            this.arrowElement.classList.add("vienna-arrow-left");
            this.arrowElement.style.bottom = "30px";
            this.arrowElement.style.left = "50px";
            return;
        }
        var arrowRect = this.arrowElement.getBoundingClientRect();
        var targetRect = targetElement.getBoundingClientRect();
        var targetOffset = this.getPageOffsetFor(targetElement);
        var arrowX = targetOffset.left + (targetRect.width / 2);
        var arrowY = targetOffset.top + (targetRect.height / 2);
        if (step.arrowPosition.contains("left")) {
            this.arrowElement.classList.add("vienna-arrow-left");
            arrowX = targetOffset.left - this.arrowElement.clientWidth;
        }
        if (step.arrowPosition.contains("right")) {
            this.arrowElement.classList.add("vienna-arrow-right");
            arrowX = targetOffset.left + targetRect.width;
        }
        if (step.arrowPosition.contains("top")) {
            this.arrowElement.classList.add("vienna-arrow-top");
            arrowY = targetOffset.top - this.arrowElement.clientHeight + 70 + (targetRect.height / 2);
        }
        if (step.arrowPosition.contains("bottom")) {
            this.arrowElement.classList.add("vienna-arrow-bottom");
            arrowY = targetOffset.top + targetRect.height;
        }
        this.arrowElement.style.top = arrowY + "px";
        this.arrowElement.style.left = arrowX + "px";
    };
    Tutorial.prototype.scrollToTarget = function (trackedElement) {
        var step = this.tutorialSteps[this.currentStepNum];
        $(trackedElement).scrollintoview({
            duration: 500,
            direction: "vertical",
            complete: function () {
                $(this.arrowElement).scrollintoview({
                    duration: 500,
                    direction: "vertical"
                });
            }
        });
    };
    Tutorial.prototype.findElement = function (searchFunction) {
        var promise = new Promise(function (resolve) {
            var observer;
            var onDomChanged = function () {
                var htmlElement = searchFunction();
                observer.disconnect();
                resolve(htmlElement);
            };
            observer = new MutationObserver(onDomChanged);
            observer.observe(document, { childList: true, subtree: true, attributes: true });
        });
        return promise;
    };
    Tutorial.prototype.runCurrentStep = function () {
        var _this = this;
        var step = this.tutorialSteps[this.currentStepNum];
        var targetElement;
        var trackedElement;
        if (step.targetElementSearch) {
            targetElement = step.targetElementSearch();
        }
        if (step.trackedElementSearch) {
            trackedElement = step.trackedElementSearch();
        }
        if (!trackedElement) {
            trackedElement = targetElement;
        }
        this.arrowElement = $("<div class=\"vienna-arrow\"><span class=\"step-number\">" + (this.currentStepNum + 1) + "</span>" + step.arrowText + "</div>")[0];
        if (step.targetElementFixed) {
            this.arrowElement.classList.add("vienna-arrow-fixed");
        }
        document.body.appendChild(this.arrowElement);
        this.replaceArrow();
        if (!step.targetElementFixed) {
            this.scrollToTarget(trackedElement);
        }
        var mutationObserverCallback = function (mutations) {
            if (step.isComplete(trackedElement)) {
                trackedElementObserver.disconnect();
                this.completeStep();
            }
        };
        switch (step.targetEvent) {
            case "domchange":
                var trackedElementObserver = new MutationObserver(mutationObserverCallback.bind(this));
                trackedElementObserver.observe(trackedElement, { attributes: true, childList: true, characterData: true, subtree: true });
                break;
            case "click": {
                var clickHandler = function () {
                    if (step.isComplete(trackedElement)) {
                        trackedElement.removeEventListener("click", clickHandler);
                        _this.completeStep();
                    }
                };
                trackedElement.addEventListener("click", clickHandler);
                break;
            }
            case "dblclick":
                var dblclickHandler = function () {
                    if (step.isComplete(trackedElement)) {
                        trackedElement.removeEventListener("dblclick", dblclickHandler);
                        _this.completeStep();
                    }
                };
                trackedElement.addEventListener("dblclick", dblclickHandler);
                break;
            case "pointerdown":
                var pointerdownHandler = function () {
                    if (step.isComplete(trackedElement)) {
                        trackedElement.removeEventListener("pointerdown", pointerdownHandler);
                        _this.completeStep();
                    }
                };
                trackedElement.addEventListener("pointerdown", pointerdownHandler);
                break;
        }
    };
    Tutorial.prototype.onDocumentChange = function () {
        if (this.replacingArrow === true) {
            return;
        }
        this.replacingArrow = true;
        this.replaceArrow();
        this.replacingArrow = false;
    };
    Tutorial.prototype.addStep = function (step) {
        this.tutorialSteps.push(step);
    };
    Tutorial.prototype.runScenario = function () {
        var documentObserver = new MutationObserver(this.onDocumentChange);
        documentObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
        this.runCurrentStep();
    };
    return Tutorial;
}());
exports.Tutorial = Tutorial;
