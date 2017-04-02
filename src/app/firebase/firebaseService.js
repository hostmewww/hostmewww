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
require("firebase");
var FirebaseService = (function () {
    function FirebaseService(settingsProvider) {
        this.settingsProvider = settingsProvider;
    }
    FirebaseService.prototype.applyConfiguration = function (firebaseSettings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.tenantRootKey = "tenants/default";
                firebase.initializeApp(firebaseSettings);
                return [2 /*return*/];
            });
        });
    };
    FirebaseService.prototype.authenticate = function (auth) {
        return __awaiter(this, void 0, void 0, function () {
            var provider_1, redirectResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!!auth) return [3 /*break*/, 2];
                        console.info("Firebase: Signing-in anonymously...");
                        return [4 /*yield*/, firebase.auth().signInAnonymously()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!auth.github) return [3 /*break*/, 6];
                        console.info("Firebase: Signing-in with Github...");
                        provider_1 = new firebase.auth.GithubAuthProvider();
                        if (auth.github.scopes) {
                            auth.github.scopes.forEach(function (scope) {
                                provider_1.addScope(scope);
                            });
                        }
                        return [4 /*yield*/, firebase.auth().getRedirectResult()];
                    case 3:
                        redirectResult = _a.sent();
                        if (!!redirectResult.credential) return [3 /*break*/, 5];
                        return [4 /*yield*/, firebase.auth().signInWithRedirect(provider_1)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5: return [2 /*return*/];
                    case 6:
                        if (!auth.basic) return [3 /*break*/, 8];
                        console.info("Firebase: Signing-in with email and password...");
                        return [4 /*yield*/, firebase.auth().signInWithEmailAndPassword(auth.basic.email, auth.basic.password)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseService.prototype.getFirebaseRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.preparingPromise) {
                    return [2 /*return*/, this.preparingPromise];
                }
                this.preparingPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var firebaseSettings;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.settingsProvider.getSetting("firebase")];
                            case 1:
                                firebaseSettings = _a.sent();
                                return [4 /*yield*/, this.applyConfiguration(firebaseSettings)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, this.authenticate(firebaseSettings["auth"])];
                            case 3:
                                _a.sent();
                                resolve(firebase);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, this.preparingPromise];
            });
        });
    };
    FirebaseService.prototype.getDatabaseRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseRef, databaseRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFirebaseRef()];
                    case 1:
                        firebaseRef = _a.sent();
                        return [4 /*yield*/, firebaseRef.database().ref(this.tenantRootKey)];
                    case 2:
                        databaseRef = _a.sent();
                        return [2 /*return*/, databaseRef];
                }
            });
        });
    };
    FirebaseService.prototype.getStorageRef = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseRef, storageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFirebaseRef()];
                    case 1:
                        firebaseRef = _a.sent();
                        storageRef = firebaseRef.storage().ref(this.tenantRootKey);
                        return [2 /*return*/, storageRef];
                }
            });
        });
    };
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
