"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorSelector = (function () {
    function ColorSelector(selectedColor, setColorCallback) {
        this.selectedColor = selectedColor;
        this.setColorCallback = setColorCallback;
        this.selectColor = this.selectColor.bind(this);
        this.colors = [
            { name: "Muted", value: "#cccccc" },
            { name: "Danger", value: "red" },
            { name: "Inverted", value: "#ffffff" },
            { name: "Gray", value: "#f8f8f8" },
            { name: "Darker gray", value: "#eef1f2" },
            { name: "Orange", value: "#eeb087" },
            { name: "Dark", value: "#2a2f30" }
        ];
    }
    ColorSelector.prototype.selectColor = function (color) {
        this.selectedColor(color.value);
        if (this.setColorCallback) {
            this.setColorCallback(color.value);
        }
    };
    ColorSelector.prototype.clearColor = function () {
        this.selectedColor(null);
        if (this.setColorCallback) {
            this.setColorCallback(null);
        }
    };
    return ColorSelector;
}());
exports.ColorSelector = ColorSelector;
