"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var progressPromise_1 = require("./../src/app/core/progressPromise");
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var FileSystemBlobStorage = (function () {
    function FileSystemBlobStorage(basePath) {
        this.basePath = basePath;
    }
    FileSystemBlobStorage.prototype.uploadBlob = function (blobPath, content) {
        var _this = this;
        return new progressPromise_1.ProgressPromise(function (resolve, reject) {
            var partPath = blobPath.replace("//", '/');
            var fullpath = "" + _this.basePath + partPath;
            mkdirp(path.dirname(fullpath), function (error) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    fs.writeFile(fullpath, new Buffer(content), function (error) {
                        if (error) {
                            reject(error);
                        }
                        resolve();
                    });
                }
            });
        });
    };
    FileSystemBlobStorage.prototype.downloadBlob = function (blobPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fullpath = _this.basePath + "/" + blobPath;
            fs.readFile(fullpath, function (error, buffer) {
                if (error) {
                    reject(error);
                }
                var arrayBuffer = new ArrayBuffer(buffer.length);
                var unit8Array = new Uint8Array(arrayBuffer);
                for (var i = 0; i < buffer.length; ++i) {
                    unit8Array[i] = buffer[i];
                }
                resolve(unit8Array);
            });
        });
    };
    FileSystemBlobStorage.prototype.listBlobs = function () {
        return __awaiter(this, void 0, void 0, function () {
            function getFilesFromDir(dir, fileTypes) {
                var resolvedPath = path.resolve(dir);
                var filesToReturn = [];
                function walkDir(currentPath) {
                    var files = fs.readdirSync(currentPath);
                    for (var i = 0; i < files.length; i++) {
                        var curFile = path.join(currentPath, files[i]);
                        if (fs.statSync(curFile).isFile()) {
                            filesToReturn.push(curFile.replace(dir, ''));
                        }
                        else if (fs.statSync(curFile).isDirectory()) {
                            walkDir(curFile);
                        }
                    }
                }
                ;
                walkDir(dir);
                return filesToReturn;
            }
            return __generator(this, function (_a) {
                return [2 /*return*/, getFilesFromDir(this.basePath)];
            });
        });
    };
    FileSystemBlobStorage.prototype.getDownloadUrl = function (filename) {
        throw "Not supported";
    };
    FileSystemBlobStorage.prototype.deleteBlob = function (filename) {
        return null;
    };
    return FileSystemBlobStorage;
}());
exports.FileSystemBlobStorage = FileSystemBlobStorage;
