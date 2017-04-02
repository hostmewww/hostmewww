ko.bindingHandlers["googlemap"] = {
    init: function (element, valueAccessor) {
        var configuration = valueAccessor();
        var geocoder = new google.maps.Geocoder();
        var mapOptions = { zoom: 17 };
        var map = new google.maps.Map(element, mapOptions);
        map.setOptions({
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false,
            scaleControl: false,
            rotateControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            draggable: false,
        });
        var marker = new google.maps.Marker();
        marker.setMap(map);
        var setLocation = function (location) {
            var request = {};
            var isCoordinates = new RegExp("(-?\\d+\(?:.\\d+)?),(-?\\d+\(?:.\\d+)?)").exec(location);
            if (isCoordinates) {
                request.location = {
                    lat: isCoordinates[1] * 1,
                    lng: isCoordinates[2] * 1,
                };
            }
            else {
                request.address = location;
            }
            geocoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    marker.setPosition(results[0].geometry.location);
                    map.setCenter(results[0].geometry.location);
                }
                else {
                }
            });
        };
        var infowindow = new google.maps.InfoWindow();
        var setCaption = function (caption) {
            infowindow.setContent(caption);
            if (caption && caption.length > 0) {
                infowindow.open(map, marker);
            }
            else {
                infowindow.close();
            }
        };
        var setZoomControl = function (state) {
            map.setOptions({ zoomControl: state === "show" });
        };
        if (ko.isObservable(configuration.location)) {
            configuration.location.subscribe(setLocation);
        }
        if (ko.isObservable(configuration.caption)) {
            configuration.caption.subscribe(setCaption);
        }
        if (ko.isObservable(configuration.zoomControl)) {
            configuration.zoomControl.subscribe(setZoomControl);
        }
        setLocation(ko.unwrap(configuration.location));
        setCaption(ko.unwrap(configuration.caption));
        setZoomControl(ko.unwrap(configuration.zoomControl));
    }
};
