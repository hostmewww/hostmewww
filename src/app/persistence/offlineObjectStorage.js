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
var lruCache_1 = require("../caching/lruCache");
var _ = require("lodash");
var ActionProperty = "action";
var ActionAdd = "add";
var ActionUpdate = "update";
var OfflineObjectStorage = (function () {
    function OfflineObjectStorage(underlyingStorage, eventManager, viewManager) {
        var _this = this;
        this.localStorage = window.sessionStorage;
        this.underlyingStorage = underlyingStorage;
        this.viewManager = viewManager;
        this.lruCache = new lruCache_1.LruCache(10000);
        this.eventManager = eventManager;
        eventManager.addEventListener("onSaveChanges", this.saveChanges.bind(this));
        this.isOnline = true;
        setTimeout(function () {
            eventManager.addEventListener("onOnlineStatusChanged", _this.onOnlineStatusChanged);
        }, 500);
    }
    OfflineObjectStorage.prototype.onOnlineStatusChanged = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tasks_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isOnline = status === "online";
                        if (!(this.isOnline && this.deletedObjects)) return [3 /*break*/, 2];
                        tasks_1 = [];
                        Object.keys(this.deletedObjects).forEach(function (path) {
                            tasks_1.push(_this.underlyingStorage.deleteObject(path));
                        });
                        if (!tasks_1.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(tasks_1)];
                    case 1:
                        _a.sent();
                        this.deletedObjects = undefined;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    OfflineObjectStorage.prototype.getItemFromCache = function (path) {
        var changedItem = this.localStorage.getItem(path);
        if (changedItem) {
            return JSON.parse(changedItem);
        }
        var cachedItem = this.lruCache.getItem(path);
        if (cachedItem) {
            return cachedItem;
        }
    };
    OfflineObjectStorage.prototype.addObject = function (key, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!key) {
                    throw new Error("Could not add object: Key is undefined.");
                }
                if (key.startsWith("uploads/")) {
                    this.underlyingStorage.addObject(key, dataObject);
                }
                else {
                    dataObject[ActionProperty] = ActionAdd;
                    this.localStorage.setItem(key, JSON.stringify(dataObject));
                }
                return [2 /*return*/];
            });
        });
    };
    OfflineObjectStorage.prototype.updateObject = function (key, dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedItem;
            return __generator(this, function (_a) {
                if (!key) {
                    throw new Error("Could not update object: Key is undefined.");
                }
                cachedItem = this.getItemFromCache(key);
                if (cachedItem) {
                    if (_.has(cachedItem, ActionProperty)) {
                        dataObject[ActionProperty] = cachedItem[ActionProperty];
                        dataObject = _.extend(cachedItem, dataObject);
                    }
                    else {
                        dataObject[ActionProperty] = ActionUpdate;
                    }
                }
                else {
                    dataObject[ActionProperty] = ActionUpdate;
                }
                this.localStorage.setItem(key, JSON.stringify(dataObject));
                this.lruCache.removeItem(key);
                return [2 /*return*/, dataObject];
            });
        });
    };
    OfflineObjectStorage.prototype.getObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedItem, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!key) {
                            throw new Error("Path is undefined.");
                        }
                        cachedItem = this.getItemFromCache(key);
                        if (cachedItem) {
                            return [2 /*return*/, Promise.resolve(cachedItem)];
                        }
                        if (!this.isOnline) {
                            throw "No internet connection";
                        }
                        return [4 /*yield*/, this.underlyingStorage.getObject(key)];
                    case 1:
                        result = _a.sent();
                        this.lruCache.setItem(key, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OfflineObjectStorage.prototype.deleteObject = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedItem = this.getItemFromCache(key);
                        if (cachedItem && cachedItem[ActionProperty] === ActionAdd) {
                            this.localStorage.removeItem(key);
                            this.lruCache.removeItem(key);
                            return [2 /*return*/];
                        }
                        if (!!this.isOnline) return [3 /*break*/, 1];
                        this.localStorage.removeItem(key);
                        this.lruCache.removeItem(key);
                        this.deletedObjects[key] = key;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.underlyingStorage.deleteObject(key)];
                    case 2:
                        _a.sent();
                        this.localStorage.removeItem(key);
                        this.lruCache.removeItem(key);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OfflineObjectStorage.prototype.getSearchId = function (item) {
        if (_.has(item, "key")) {
            return item.key;
        }
        if (_.has(item, "contentId")) {
            return item.contentId;
        }
        if (_.has(item, "permalinkId")) {
            return item.permalinkId;
        }
        return undefined;
    };
    OfflineObjectStorage.prototype.convertToSearchParam = function (propertyNames, searchValue) {
        return propertyNames.map(function (name) {
            var prop = {};
            prop[name] = searchValue;
            return prop;
        });
    };
    OfflineObjectStorage.prototype.searchPropertyInObject = function (searchProps, startAtSearch, matchedObj) {
        return _.find(searchProps, function (prop) {
            if (startAtSearch) {
                var propName = _.keys(prop)[0];
                var test = matchedObj[propName];
                return test && test.toUpperCase().startsWith(prop[propName].toUpperCase());
            }
            else {
                return _.isMatch(matchedObj, prop);
            }
        });
    };
    OfflineObjectStorage.prototype.mergeResultWithCache = function (result, path, propertyNames, searchValue, startAtSearch) {
        var _this = this;
        var resultIsNotEmpty = result && result.length;
        if (propertyNames && propertyNames.length && searchValue) {
            var searchProps_1 = this.convertToSearchParam(propertyNames, searchValue);
            if (resultIsNotEmpty && startAtSearch) {
                var filteredResult_1 = [];
                result.forEach(function (item) {
                    var searchProperty = _this.searchPropertyInObject(searchProps_1, true, item);
                    if (searchProperty) {
                        filteredResult_1.push(item);
                    }
                });
                result = filteredResult_1;
            }
            Object.keys(this.localStorage).forEach(function (key) {
                if (key.startsWith(path)) {
                    var matchedObj_1 = JSON.parse(_this.localStorage.getItem(key));
                    var searchProperty = _this.searchPropertyInObject(searchProps_1, startAtSearch, matchedObj_1);
                    if (searchProperty) {
                        delete matchedObj_1[ActionProperty];
                        if (resultIsNotEmpty) {
                            var itemInResult = _.find(result, function (item, index) {
                                var searchId = _this.getSearchId(item);
                                if (searchId && key.endsWith(searchId)) {
                                    result[index] = matchedObj_1;
                                    return true;
                                }
                            });
                            if (!itemInResult) {
                                result.push(matchedObj_1);
                                _this.lruCache.removeItem(key);
                            }
                        }
                        else {
                            result.push(matchedObj_1);
                            _this.lruCache.removeItem(key);
                        }
                    }
                }
            });
        }
        else {
            Object.keys(this.localStorage).forEach(function (key) {
                if (key.startsWith(path)) {
                    var matchedObj_2 = JSON.parse(_this.localStorage.getItem(key));
                    delete matchedObj_2[ActionProperty];
                    if (resultIsNotEmpty) {
                        var itemInResult = _.find(result, function (item, index) {
                            var searchId = _this.getSearchId(item);
                            if (searchId && key.endsWith(searchId)) {
                                result[index] = matchedObj_2;
                                return true;
                            }
                        });
                        if (!itemInResult) {
                            result.push(matchedObj_2);
                            _this.lruCache.removeItem(key);
                        }
                    }
                    else {
                        result.push(matchedObj_2);
                        _this.lruCache.removeItem(key);
                    }
                }
            });
        }
        return result;
    };
    OfflineObjectStorage.prototype.searchObjects = function (path, propertyNames, searchValue, startAtSearch, skipLoadObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isOnline) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.underlyingStorage.searchObjects(path, propertyNames, searchValue, startAtSearch)];
                    case 1:
                        result = _a.sent();
                        result.forEach(function (item) {
                            var key;
                            if (path === "navigationItems") {
                                key = path;
                            }
                            else {
                                key = _this.getSearchId(item);
                                if (path === "layouts") {
                                    key = "layouts/" + key;
                                }
                            }
                            _this.lruCache.setItem(key, item);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        result = [];
                        keys = this.lruCache.getKeys();
                        keys.forEach(function (key) {
                            if (key.startsWith(path)) {
                                var matchedObj = _this.lruCache.getItem(key);
                                if (propertyNames && propertyNames.length && searchValue) {
                                    var searchProps = _this.convertToSearchParam(propertyNames, searchValue);
                                    var searchProperty = _this.searchPropertyInObject(searchProps, startAtSearch, matchedObj);
                                    if (searchProperty) {
                                        result.push(matchedObj);
                                    }
                                }
                                else {
                                    if (path === "navigationItems" && key === "navigationItems") {
                                        result.push(matchedObj);
                                    }
                                    else {
                                        var searchId = _this.getSearchId(matchedObj);
                                        if (searchId && key.endsWith(searchId)) {
                                            result.push(matchedObj);
                                        }
                                    }
                                }
                            }
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.mergeResultWithCache(result, path, propertyNames, searchValue, startAtSearch)];
                }
            });
        });
    };
    OfflineObjectStorage.prototype.saveChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var indicator, saveTasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indicator = this.viewManager.addProgressIndicator("Storage", "Saving changes...");
                        if (!this.isOnline) {
                            throw "No internet connection";
                        }
                        saveTasks = [];
                        Object.keys(this.localStorage).forEach(function (localStorageObjectKey) {
                            var localStorageObjectValue = _this.localStorage.getItem(localStorageObjectKey);
                            if (localStorageObjectValue) {
                                var obj = JSON.parse(localStorageObjectValue);
                                if (_.has(obj, ActionProperty)) {
                                    var isAddAction = obj[ActionProperty] === ActionAdd;
                                    delete obj[ActionProperty];
                                    if (isAddAction) {
                                        saveTasks.push(_this.underlyingStorage.addObject(localStorageObjectKey, obj));
                                    }
                                    else {
                                        saveTasks.push(_this.underlyingStorage.updateObject(localStorageObjectKey, obj));
                                    }
                                    _this.localStorage.removeItem(localStorageObjectKey);
                                    _this.lruCache.setItem(localStorageObjectKey, obj);
                                }
                            }
                        });
                        return [4 /*yield*/, Promise.all(saveTasks)];
                    case 1:
                        _a.sent();
                        this.viewManager.scheduleIndicatorRemoval(indicator);
                        return [2 /*return*/];
                }
            });
        });
    };
    return OfflineObjectStorage;
}());
exports.OfflineObjectStorage = OfflineObjectStorage;
