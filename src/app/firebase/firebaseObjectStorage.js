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
var _ = require("lodash");
var FirebaseObjectStorage = (function () {
    function FirebaseObjectStorage(firebaseService) {
        this.firebaseService = firebaseService;
    }
    FirebaseObjectStorage.prototype.addObject = function (path, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        if (!path) return [3 /*break*/, 3];
                        return [4 /*yield*/, databaseRef.child(path).set(dataObject)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, databaseRef.update(dataObject)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        throw "Could not add object '" + path + "'. Error: " + error_1 + ".";
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.getObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, snapshot, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        return [4 /*yield*/, databaseRef.child(path).once("value")];
                    case 2:
                        snapshot = _a.sent();
                        return [2 /*return*/, snapshot.val()];
                    case 3:
                        error_2 = _a.sent();
                        throw "Could not retrieve object '" + path + "'. Error: " + error_2 + ".";
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.deleteObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        databaseRef.child(path).remove();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw "Could not delete object '" + path + "'. Error: " + error_3 + ".";
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.updateObject = function (path, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        return [4 /*yield*/, databaseRef.child(path).update(dataObject)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        throw "Could not update object '" + path + "'. Error: " + error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.searchObjects = function (path, propertyNames, searchValue, startAtSearch, skipLoadObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var databaseRef, pathRef_1, searchPromises, searchTaskResults, objectData, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.firebaseService.getDatabaseRef()];
                    case 1:
                        databaseRef = _a.sent();
                        pathRef_1 = databaseRef.child(path);
                        if (!(propertyNames && propertyNames.length && searchValue)) return [3 /*break*/, 3];
                        searchPromises = propertyNames.map(function (propertyName) { return __awaiter(_this, void 0, void 0, function () {
                            var query, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        query = startAtSearch
                                            ? pathRef_1.orderByChild(propertyName).startAt(searchValue)
                                            : pathRef_1.orderByChild(propertyName).equalTo(searchValue);
                                        return [4 /*yield*/, query.once("value")];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, this.collectResult(result)];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(searchPromises)];
                    case 2:
                        searchTaskResults = _a.sent();
                        return [2 /*return*/, _.flatten(searchTaskResults)];
                    case 3: return [4 /*yield*/, pathRef_1.once("value")];
                    case 4:
                        objectData = _a.sent();
                        result = this.collectResult(objectData);
                        return [2 /*return*/, result];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        throw "Could not search object '" + path + "'. Error: " + error_5 + ".";
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseObjectStorage.prototype.collectResult = function (objectData) {
        var result = [];
        if (objectData.hasChildren()) {
            var items = objectData.val();
            if (items) {
                if (Array.isArray(items)) {
                    items.map(function (item) { return result.push(item); });
                }
                else {
                    _.map(items, function (item) { return result.push(item); });
                }
            }
        }
        return result;
    };
    ;
    return FirebaseObjectStorage;
}());
exports.FirebaseObjectStorage = FirebaseObjectStorage;
