// function initMap() {
//         var coord = {lat: -26.2041, lng: 28.0473};
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 17,
//           center: coord
//         });
//         var marker = new google.maps.Marker({
//           position: coord,
//           icon: 'https://maps.google.com/mapfiles/kml/pal3/icon40.png',
//           map: map
//         });
//       }


var map;

            function initMap() {
              if (navigator.geolocation) {
                try {
                  navigator.geolocation.getCurrentPosition(function(position) {
                    var myLocation = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                    setPos(myLocation);
                  });
                } catch (err) {
                  var myLocation = {
                    lat: -26.2041,
                    lng: 28.0473
                  };
                  setPos(myLocation);
                }
              } else {
                var myLocation = {
                  lat: -26.2041,
                  lng: 28.0473
                };
                setPos(myLocation);
              }
            }

            function setPos(myLocation) {
              map = new google.maps.Map(document.getElementById('map'), {
                center: myLocation,
                zoom: 10,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
                /*styles: [
                  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                  {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#263c3f'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#6b9a76'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#1f2835'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#f3d19c'}]
                  },
                  {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#2f3948'}]
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#515c6d'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                  }
                ]*/
              });

              var service = new google.maps.places.PlacesService(map);
              service.nearbySearch({
                location: myLocation,
                radius: 5000,
                types: ['hospital', 'doctor', 'pharmacy']
              }, processResults);

              var myMarker = new google.maps.Marker({
                position: myLocation,
                icon: 'https://maps.google.com/mapfiles/kml/pal3/icon40.png',
                map: map
              });

            }

            function processResults(results, status, pagination) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              } else {
                createMarkers(results);

              }
            }

            function createMarkers(places) {
              var bounds = new google.maps.LatLngBounds();
              var placesList = document.getElementById('places');

              for (var i = 0, place; place = places[i]; i++) {
                var image = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                var marker = new google.maps.Marker({
                  map: map,
                  icon: image,
                  title: place.name,
                  animation: google.maps.Animation.DROP,
                  position: place.geometry.location
                });

                bounds.extend(place.geometry.location);
              }
              map.fitBounds(bounds);
            }