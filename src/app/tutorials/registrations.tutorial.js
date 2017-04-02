"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tutorial_1 = require("../tutorials/tutorial");
var TutorialRegistration = (function () {
    function TutorialRegistration() {
    }
    TutorialRegistration.prototype.register = function (injector) {
        injector.bind("tutorial", tutorial_1.Tutorial);
    };
    return TutorialRegistration;
}());
exports.TutorialRegistration = TutorialRegistration;
