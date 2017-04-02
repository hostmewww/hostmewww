"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodeEditor = (function () {
    function CodeEditor(viewManager) {
        var _this = this;
        this.objcLang = new AceLanguage("Objective C", "objectivec");
        this.cppLangh = new AceLanguage("C++", "c_cpp");
        this.csharpLang = new AceLanguage("C#", "csharp");
        this.javaLang = new AceLanguage("Java", "java");
        this.jsLang = new AceLanguage("Java Script", "javascript");
        this.curlLang = new AceLanguage("Curl", "curl");
        this.htmlLang = new AceLanguage("HTML", "html");
        this.viewManager = viewManager;
        this.setWidgetModel = this.setWidgetModel.bind(this);
        this.languages = ko.observableArray([
            this.curlLang,
            this.jsLang,
            this.javaLang,
            this.csharpLang,
            this.cppLangh,
            this.objcLang
        ]);
        this.languageMap = new Array();
        this.languageMap["curl"] = this.curlLang;
        this.languageMap["javascript"] = this.jsLang;
        this.languageMap["java"] = this.javaLang;
        this.languageMap["csharp"] = this.csharpLang;
        this.languageMap["c_cpp"] = this.cppLangh;
        this.languageMap["objectivec"] = this.objcLang;
        this.languageMap["html"] = this.htmlLang;
        this.themes = ko.observableArray([
            "ambiance",
            "chaos",
            "chrome",
            "clouds",
            "dawn"
        ]);
        this.code = ko.observable(null);
        this.selectedLanguage = ko.observable(null);
        this.selectedLanguage.subscribe(function (v) { _this.code().lang(v.value); });
        this.selectedTheme = ko.observable(null);
        this.selectedTheme.subscribe(function (v) { _this.code().theme(v); });
        this.text = ko.observable(null);
        this.text.subscribe(function (v) { return _this.code().code(v); });
    }
    CodeEditor.prototype.setWidgetModel = function (code) {
        this.code = ko.observable(code);
        this.lang = ko.observable(code.lang());
        this.selectedLanguage(this.languageMap[this.lang()]);
        this.selectedTheme(code.theme());
        this.text(code.code());
        code.isEditable(true);
    };
    return CodeEditor;
}());
exports.CodeEditor = CodeEditor;
var AceLanguage = (function () {
    function AceLanguage(text, value) {
        this.text = text;
        this.value = value;
    }
    return AceLanguage;
}());
exports.AceLanguage = AceLanguage;
