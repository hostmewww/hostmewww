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
var httpMethod_1 = require("../http/httpMethod");
var githubMode_1 = require("../github/githubMode");
var githubTreeItemType_1 = require("../github/githubTreeItemType");
var Utils = require("../../app/core/utils");
var _ = require("lodash");
var GithubClient = (function () {
    function GithubClient(settingsProvider, httpClient) {
        this.settingsProvider = settingsProvider;
        this.httpClient = httpClient;
        this.getHeads = this.getHeads.bind(this);
        this.ensureConfig = this.ensureConfig.bind(this);
        this.changes = [];
    }
    GithubClient.prototype.applyConfiguration = function (githubSettings) {
        this.authorizationToken = githubSettings["authorizationKey"];
        this.repositoryName = githubSettings["repositoryName"];
        this.repositoryOwner = githubSettings["repositoryOwner"];
        this.baseUrl = "https://api.github.com/repos/" + this.repositoryOwner + "/" + this.repositoryName;
        this.baseRepositoriesUrl = this.baseUrl + "/git";
        this.mandatoryHttpHeaders = [{ name: "Authorization", value: "token " + this.authorizationToken }];
        return Promise.resolve();
    };
    GithubClient.prototype.ensureConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.settingsProvider.getSetting("github")];
                    case 1:
                        settings = _a.sent();
                        return [4 /*yield*/, this.applyConfiguration(settings)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GithubClient.prototype.getFileContent = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseUrl + "/contents/" + path,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.deleteFile = function (path, blobSha, commitMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        requestBody = {
                            "sha": blobSha,
                            "message": commitMsg,
                            "branch": "master"
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseUrl + "/contents/" + path,
                                method: httpMethod_1.HttpMethod.delete,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GithubClient.prototype.getHeads = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/refs/heads",
                                method: httpMethod_1.HttpMethod.get,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.getCommit = function (commitSha) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/commits/" + commitSha,
                                method: httpMethod_1.HttpMethod.get,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.createCommit = function (parentCommitSha, tree, message) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        requestBody = {
                            "message": message,
                            "tree": tree,
                            "parents": parentCommitSha ? [parentCommitSha] : []
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/commits",
                                method: httpMethod_1.HttpMethod.post,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.getTree = function (treeSha) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/trees/" + treeSha + "?recursive=1",
                                method: httpMethod_1.HttpMethod.get,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.createTree = function (baseTreeSha, treeItems) {
        return __awaiter(this, void 0, void 0, function () {
            var tree, requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        tree = new Array();
                        treeItems.forEach(function (treeItem) {
                            tree.push({
                                "path": treeItem.path,
                                "sha": treeItem.sha,
                                "mode": githubMode_1.GithubMode.file,
                                "type": githubTreeItemType_1.GithubTreeItemType.blob
                            });
                        });
                        requestBody = {
                            "base_tree": baseTreeSha,
                            "tree": tree
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/trees",
                                method: httpMethod_1.HttpMethod.post,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.createReference = function (branch, commitSha) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        requestBody = {
                            "ref": "refs/heads/" + branch,
                            "sha": commitSha
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/refs",
                                method: httpMethod_1.HttpMethod.post,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.deleteReference = function (branch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/refs/heads/" + branch,
                                method: httpMethod_1.HttpMethod.delete,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GithubClient.prototype.updateReference = function (branch, commitSha) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        requestBody = {
                            "sha": commitSha,
                            "force": true
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/refs/heads/" + branch,
                                method: httpMethod_1.HttpMethod.patch,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.toObject()];
                }
            });
        });
    };
    GithubClient.prototype.push = function (message, branch) {
        if (message === void 0) { message = null; }
        if (branch === void 0) { branch = "master"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pushTree(this.changes, message, branch)];
                    case 1:
                        _a.sent();
                        this.changes = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    GithubClient.prototype.pushTree = function (treeItems, message, branch) {
        if (message === void 0) { message = null; }
        if (branch === void 0) { branch = "master"; }
        return __awaiter(this, void 0, void 0, function () {
            var heads, lastCommitReference, lastCommit, createTreeResponse, newCommit, head;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeads()];
                    case 2:
                        heads = _a.sent();
                        lastCommitReference = _.last(heads).object;
                        return [4 /*yield*/, this.getCommit(lastCommitReference.sha)];
                    case 3:
                        lastCommit = _a.sent();
                        return [4 /*yield*/, this.createTree(lastCommit.tree.sha, treeItems)];
                    case 4:
                        createTreeResponse = _a.sent();
                        if (!message) {
                            message = moment().format("MM/DD/YYYY, hh:mm:ss");
                        }
                        return [4 /*yield*/, this.createCommit(lastCommit.sha, createTreeResponse.sha, message)];
                    case 5:
                        newCommit = _a.sent();
                        return [4 /*yield*/, this.updateReference(branch, newCommit.sha)];
                    case 6:
                        head = _a.sent();
                        return [2 /*return*/, head];
                }
            });
        });
    };
    GithubClient.prototype.getBlob = function (blobSha) {
        return __awaiter(this, void 0, void 0, function () {
            var response, getBlobReponse, blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/blobs/" + blobSha,
                                method: httpMethod_1.HttpMethod.get,
                                headers: this.mandatoryHttpHeaders
                            })];
                    case 2:
                        response = _a.sent();
                        getBlobReponse = response.toObject();
                        blob = {
                            content: atob(getBlobReponse.content),
                            path: ""
                        };
                        return [2 /*return*/, blob];
                }
            });
        });
    };
    GithubClient.prototype.createBlob = function (path, content) {
        return __awaiter(this, void 0, void 0, function () {
            var base64, requestBody, httpResponse, response, treeItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        base64 = Utils.arrayBufferToBase64(content);
                        requestBody = {
                            content: base64,
                            encoding: "base64"
                        };
                        return [4 /*yield*/, this.httpClient.send({
                                url: this.baseRepositoriesUrl + "/blobs",
                                method: httpMethod_1.HttpMethod.post,
                                headers: this.mandatoryHttpHeaders,
                                body: JSON.stringify(requestBody)
                            })];
                    case 2:
                        httpResponse = _a.sent();
                        response = httpResponse.toObject();
                        treeItem = {
                            path: path,
                            sha: response.sha
                        };
                        this.changes.push(treeItem);
                        return [2 /*return*/];
                }
            });
        });
    };
    GithubClient.prototype.getLatestCommitTree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var heads, lastCommitReference, lastCommit, getTreeResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeads()];
                    case 2:
                        heads = _a.sent();
                        lastCommitReference = _.last(heads).object;
                        return [4 /*yield*/, this.getCommit(lastCommitReference.sha)];
                    case 3:
                        lastCommit = _a.sent();
                        return [4 /*yield*/, this.getTree(lastCommit.tree.sha)];
                    case 4:
                        getTreeResponse = _a.sent();
                        getTreeResponse.lastCommit = lastCommit;
                        return [2 /*return*/, getTreeResponse];
                }
            });
        });
    };
    GithubClient.prototype.getLatestCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var heads, lastCommitReference, commit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureConfig()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getHeads()];
                    case 2:
                        heads = _a.sent();
                        lastCommitReference = _.last(heads).object;
                        return [4 /*yield*/, this.getCommit(lastCommitReference.sha)];
                    case 3:
                        commit = _a.sent();
                        return [2 /*return*/, commit];
                }
            });
        });
    };
    return GithubClient;
}());
exports.GithubClient = GithubClient;
