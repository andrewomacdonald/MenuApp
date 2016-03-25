angular.module('menuApp')

.controller('restaurantListController', ['$window', '$scope', '$state', 'menuAppFactory', 'Geolocation', 'Auth', 'userInfo', function($window, $scope, $state, menuAppFactory, Geolocation, Auth, userInfo) {
  $scope.data = [];

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.displayRestaurants = function() {
    Geolocation.getLatLong(function(lat, lng) {
      Geolocation.formatLatLong(lat, lng, function(coords) {
        menuAppFactory.getRestaurantList(coords)
        .then(function(data) {
          data.forEach(function(value) {
            value.formatted = value.location.formattedAddress.join();
          });
          $scope.data = data;
        })
        .catch(function(err) {
          console.log(err);
        });
      });
    });
  };

  $scope.restaurantMenu = function(restaurantId) {
    console.log('++line 28 inside restaurantMenu() in restaurantListCtrl',restaurantId);
    $scope.restaurantId = restaurantId;
    // $state.go('menuView', {'restaurantId': $scope.restaurantId});
    menuAppFactory.getMenu(restaurantId)
    .then(function(data) {
      console.log('++line 33 inside restaurantMenu() in restaurantListCtrl restaurantId:', restaurantId);
      console.log('++line 34 inside restaurantMenu() in restaurantListCtrl data:', data);
      userInfo.getRating(restaurantId)
      .then(function(ratingData) {
        console.log('++line 37 in restaurantMenu() in restListCtrl data: ',data);
        if (ratingData !== undefined) {
          $state.go('menuView', {menuData: data, restaurantId: restaurantId});
        } else {
          data.forEach(function(ratingData) {
            console.log('++line39 in restaurantMenu() in restListCtrl ratingData: ',ratingData);
            if (ratingData.entryId === data.entryId) {
              data.ratingInfo = ratingData.rating;
            }
            console.log('++line 43 post getRating() in restListCtrl data:',data);
          });
          $state.go('menuView', {menuData: data, restaurantId: restaurantId});
        }
      });
    });
  };

  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("autocomplete")),
    {types: ["geocode"]});


  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if(!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    if (place.geometry.viewport) {
      $scope.map.fitBounds(place.geometry.viewport);
    } else {
      $scope.map.setCenter(place.geometry.location);

$scope.map.setZoom(17);  // Why 17? Because it looks good.
}
});

  function initMap() {
// Create a map object and specify the DOM element for display.

if (navigator.geolocation) {
  var thislat;
  var thislng;
  navigator.geolocation.getCurrentPosition(function(position) {
    thislat = position.coords.latitude;
    thislng = position.coords.longitude;


    var current_coords = {lat: thislat, lng: thislng};
    makeMap(current_coords);
  });

  var makeMap = function(current_coords) {
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      center: current_coords,
      scrollwheel: false,
      zoom: 14
    });
  };

}
}

initMap();
}]);
