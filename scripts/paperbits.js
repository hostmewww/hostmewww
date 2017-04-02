(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
ko.bindingHandlers["snapTo"] = {
    init: function (element, valueAccessor) {
        var config = valueAccessor();
        if (ko.isObservable(config)) {
            config.subscribe(function (newConfig) {
                element["snapClass"] = null;
                if (newConfig === "top") {
                    element["snapClass"] = "snap-to-top";
                }
                if (newConfig === "bottom") {
                    element["snapClass"] = "snap-to-bottom";
                }
            });
        }
        var updatePosition = function () {
            var snapClass = element["snapClass"];
            if (!snapClass) {
                return;
            }
            if (element.classList.contains(snapClass)) {
                if (element["snapScrollY"] >= window.scrollY) {
                    element.classList.remove("snap");
                    element.classList.remove(snapClass);
                    document.body.style.paddingTop = "0";
                }
            }
            else {
                var rect = element.getBoundingClientRect();
                if (rect.top <= 1) {
                    element["snapScrollY"] = window.scrollY;
                    element.classList.add("snap");
                    element.classList.add(snapClass);
                    document.body.style.paddingTop = rect.height + "px";
                }
            }
        };
        updatePosition();
        document.addEventListener("scroll", updatePosition);
    }
};
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../app.ko/bindingHandlers/bindingHandlers.snapTo");
},{"../app.ko/bindingHandlers/bindingHandlers.snapTo":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmtvL2JpbmRpbmdIYW5kbGVycy9iaW5kaW5nSGFuZGxlcnMuc25hcFRvLnRzIiwic3JjL3JlZ2lzdHJhdGlvbnMva25vY2tvdXQudGFyZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRztJQUM1QixJQUFJLFlBQUMsT0FBb0IsRUFBRSxhQUF3QjtRQUMvQyxJQUFJLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUU3QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUztnQkFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFFNUIsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFhLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDNUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELElBQUksY0FBYyxHQUFHO1lBQ2pCLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFakMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUd4RCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVELGNBQWMsRUFBRSxDQUFDO1FBRWpCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKLENBQUM7Ozs7QUNuREYsNERBQTJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIu+7v2tvLmJpbmRpbmdIYW5kbGVyc1tcInNuYXBUb1wiXSA9IHtcbiAgICBpbml0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZUFjY2Vzc29yOiAoKSA9PiBhbnkpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHZhbHVlQWNjZXNzb3IoKTtcblxuICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGNvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUobmV3Q29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W1wic25hcENsYXNzXCJdID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChuZXdDb25maWcgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtcInNuYXBDbGFzc1wiXSA9IFwic25hcC10by10b3BcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3Q29uZmlnID09PSBcImJvdHRvbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJzbmFwQ2xhc3NcIl0gPSBcInNuYXAtdG8tYm90dG9tXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB1cGRhdGVQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzbmFwQ2xhc3MgPSBlbGVtZW50W1wic25hcENsYXNzXCJdO1xuXG4gICAgICAgICAgICBpZiAoIXNuYXBDbGFzcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNuYXBDbGFzcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFtcInNuYXBTY3JvbGxZXCJdID49IHdpbmRvdy5zY3JvbGxZKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNuYXBcIik7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzbmFwQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdUb3AgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjdC50b3AgPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50W1wic25hcFNjcm9sbFlcIl0gPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic25hcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNuYXBDbGFzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nVG9wID0gcmVjdC5oZWlnaHQgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBBcHBlbmQgcGFkZGluZyB0byBib2R5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IMKgJy4uL2FwcC5rby9iaW5kaW5nSGFuZGxlcnMvYmluZGluZ0hhbmRsZXJzLnNuYXBUbyc7Il19
