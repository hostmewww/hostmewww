String.prototype.contains = function (value, caseInsensitive) {
    if (caseInsensitive === void 0) { caseInsensitive = false; }
    var originalValue = this;
    if (caseInsensitive) {
        originalValue = originalValue.toLowerCase();
        value = value.toLowerCase();
    }
    return originalValue.indexOf(value) !== -1;
};
String.prototype.containsOneOf = function (substrings) {
    var value = this;
    var result = false;
    substrings.forEach(function (substring) {
        if (value.contains(substring))
            result = true;
    });
    return result;
};
String.prototype.format = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var formatted = this;
    for (var i = 0; i < values.length; i++) {
        var regexp = new RegExp("\\{" + i + "\\}", "gi");
        if (values[i])
            formatted = formatted.replace(regexp, values[i]);
        else
            formatted = formatted.replace(regexp, "");
    }
    return formatted;
};
String.prototype.startsWith = function (value) {
    return this.substring(0, value.length) == value;
};
String.prototype.endsWith = function (value) {
    return this.lastIndexOf(value) == this.length - value.length;
};
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0)
        return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};
String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};
Array.prototype.any = function (predicate) {
    var result = false;
    $.each(this, function () {
        if (predicate(this)) {
            result = true;
        }
    });
    return result;
};
Array.prototype.first = function (predicate) {
    var result = null;
    if (!predicate)
        predicate = function () { return true; };
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            result = this[i];
            break;
        }
    }
    ;
    return result;
};
Array.prototype.where = function (predicate) {
    var result = new Array();
    $.each(this, function () {
        if (predicate(this))
            result.push(this);
    });
    return result;
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    this.splice(index, 1);
};
