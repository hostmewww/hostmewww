"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalEventHandler = (function () {
    function GlobalEventHandler(eventManager) {
        this.eventManager = eventManager;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onCtrlS = this.onCtrlS.bind(this);
        this.onEscape = this.onEscape.bind(this);
        this.addDragStartListener = this.addDragStartListener.bind(this);
        this.addDragEnterListener = this.addDragEnterListener.bind(this);
        this.addDragDropListener = this.addDragDropListener.bind(this);
        this.addDragEndListener = this.addDragEndListener.bind(this);
        this.addDragLeaveListener = this.addDragLeaveListener.bind(this);
        this.addDragLeaveScreenListener = this.addDragLeaveScreenListener.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragDrop = this.onDragDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onPaste = this.onPaste.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("dragenter", this.onDragEnter, true);
        document.addEventListener("dragstart", this.onDragStart, true);
        document.addEventListener("dragover", this.onDragOver, true);
        document.addEventListener("dragleave", this.onDragLeave);
        document.addEventListener("drop", this.onDragDrop, true);
        document.addEventListener("dragend", this.onDragEnd, true);
        document.addEventListener("paste", this.onPaste, true);
    }
    GlobalEventHandler.prototype.onKeyDown = function (event) {
        if (event.ctrlKey && event.keyCode === 83) {
            event.preventDefault();
            this.onCtrlS();
        }
        if (event.ctrlKey && event.keyCode === 80) {
            event.preventDefault();
            this.onCtrlP();
        }
        if (event.keyCode === 27) {
            event.preventDefault();
            this.onEscape();
        }
    };
    GlobalEventHandler.prototype.onCtrlS = function () {
        this.eventManager.dispatchEvent("onSaveChanges");
    };
    GlobalEventHandler.prototype.onCtrlP = function () {
        this.eventManager.dispatchEvent("onPublish");
    };
    GlobalEventHandler.prototype.onEscape = function () {
        this.eventManager.dispatchEvent("onEscape");
    };
    GlobalEventHandler.prototype.onDragStart = function (event) {
        this.eventManager.dispatchEvent("onDragStart");
    };
    GlobalEventHandler.prototype.onDragEnter = function (event) {
        this.eventManager.dispatchEvent("onDragEnter");
        event.preventDefault();
    };
    GlobalEventHandler.prototype.onDragOver = function (event) {
        event.preventDefault();
        this.eventManager.dispatchEvent("onDragOver");
    };
    GlobalEventHandler.prototype.onDragLeave = function (event) {
        this.eventManager.dispatchEvent("onDragLeave");
        if (event.screenX === 0 && event.screenY === 0) {
            this.eventManager.dispatchEvent("onDragLeaveScreen");
        }
    };
    GlobalEventHandler.prototype.onDragDrop = function (event) {
        this.eventManager.dispatchEvent("onDragDrop", event);
        event.preventDefault();
    };
    GlobalEventHandler.prototype.onDragEnd = function () {
        this.eventManager.dispatchEvent("onDragEnd");
    };
    GlobalEventHandler.prototype.onPaste = function (event) {
        this.eventManager.dispatchEvent("onPaste", event);
    };
    GlobalEventHandler.prototype.addDragStartListener = function (callback) {
        this.eventManager.addEventListener("onDragStart", callback);
    };
    GlobalEventHandler.prototype.addDragEnterListener = function (callback) {
        this.eventManager.addEventListener("onDragEnter", callback);
    };
    GlobalEventHandler.prototype.addDragOverListener = function (callback) {
        this.eventManager.addEventListener("onDragOver", callback);
    };
    GlobalEventHandler.prototype.addDragLeaveListener = function (callback) {
        this.eventManager.addEventListener("onDragLeave", callback);
    };
    GlobalEventHandler.prototype.addDragLeaveScreenListener = function (callback) {
        this.eventManager.addEventListener("onDragLeaveScreen", callback);
    };
    GlobalEventHandler.prototype.addDragDropListener = function (callback) {
        this.eventManager.addEventListener("onDragDrop", callback);
    };
    GlobalEventHandler.prototype.addDragEndListener = function (callback) {
        this.eventManager.addEventListener("onDragEnd", callback);
    };
    GlobalEventHandler.prototype.addPasteListener = function (callback) {
        this.eventManager.addEventListener("onPaste", callback);
    };
    return GlobalEventHandler;
}());
exports.GlobalEventHandler = GlobalEventHandler;
