"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var progressPromise_1 = require("../core/progressPromise");
function createFunctionBag() {
    var items = [];
    var bag = function () {
        for (var i = 0; i < items.length; i++) {
            items[i]();
        }
    };
    bag.add = function (item) {
        items.push(item);
        return bag;
    };
    return bag;
}
exports.createFunctionBag = createFunctionBag;
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}
exports.guid = guid;
function createComponent(nodeName, attributes) {
    var htmlElement = document.createElement(nodeName);
    htmlElement.style.width = "200px";
    Object.keys(attributes).forEach(function (key) { return htmlElement.setAttribute(key, attributes[key]); });
    ko.applyBindings({}, htmlElement);
    return htmlElement;
}
exports.createComponent = createComponent;
function readUrlAsBlob(url) {
    return new progressPromise_1.ProgressPromise(function (resolve, reject, progress) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.onprogress = progressEventToProgress(function (percent) { return progress(percent); });
        xhr.onload = function () { return resolve(new Uint8Array(xhr.response)); };
        xhr.open('GET', url);
        xhr.send();
    });
}
exports.readUrlAsBlob = readUrlAsBlob;
function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
exports.arrayBufferToBase64 = arrayBufferToBase64;
function readFileAsByteArray(file) {
    return new progressPromise_1.ProgressPromise(function (resolve, reject, progress) {
        var reader = new FileReader();
        reader.onload = function (event) { return resolve(event.target.result); };
        reader.onprogress = progressEventToProgress(progress);
        reader.readAsArrayBuffer(file);
    });
}
exports.readFileAsByteArray = readFileAsByteArray;
function readBlobAsDataUrl(file) {
    return readDataUrlFromReader(function (reader) { return reader.readAsDataURL(file); });
}
exports.readBlobAsDataUrl = readBlobAsDataUrl;
function readDataUrlFromReader(read) {
    return new progressPromise_1.ProgressPromise(function (resolve, reject, progress) {
        var reader = new FileReader();
        reader.onload = function (event) { return resolve(event.target.result); };
        reader.onprogress = progressEventToProgress(progress);
        read(reader);
    });
}
function progressEventToProgress(progress) {
    return function (event) {
        if (event.lengthComputable) {
            var percentLoaded = Math.round((event.loaded / event.total) * 100);
            progress(percentLoaded);
        }
    };
}
function isDirectUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:");
}
exports.isDirectUrl = isDirectUrl;
function lazy(factory) {
    var value;
    var evaluated = false;
    return function () {
        if (evaluated) {
            return value;
        }
        evaluated = true;
        return value = factory();
    };
}
exports.lazy = lazy;
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}
exports.getCookie = getCookie;
