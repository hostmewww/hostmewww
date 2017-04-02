"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var progressPromise_1 = require("../core/progressPromise");
var httpClientReponse_1 = require("../http/httpClientReponse");
var XmlHttpRequestClient = (function () {
    function XmlHttpRequestClient() {
        this.send = this.send.bind(this);
    }
    XmlHttpRequestClient.prototype.send = function (request) {
        if (!request.method)
            request.method = "GET";
        if (!request.headers)
            request.headers = [];
        return new progressPromise_1.ProgressPromise(function (resolve, reject, progress) {
            var xhr = new XMLHttpRequest();
            xhr.onprogress = function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    var percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                    progress(percentComplete);
                }
            };
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                var response = new httpClientReponse_1.HttpClientReponse(xhr.response);
                resolve(response);
            };
            xhr.open(request.method, request.url, true);
            request.headers.forEach(function (header) {
                xhr.setRequestHeader(header.name, header.value);
            });
            xhr.send(request.body);
        });
    };
    return XmlHttpRequestClient;
}());
exports.XmlHttpRequestClient = XmlHttpRequestClient;
